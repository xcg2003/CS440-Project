import type { FastifyInstance } from "fastify";

const BOOK_SEARCH_URL = process.env["BOOK_SEARCH_SERVICE_URL"] ?? "http://localhost:3001";
const BOOK_LIBRARY_URL = process.env["BOOK_LIBRARY_SERVICE_URL"] ?? "http://localhost:3002";

/**
 * Forwards an incoming request to a downstream service URL and
 * streams the response back to the caller.
 */
async function proxyRequest(
    targetUrl: string,
    method: string,
    body?: unknown
): Promise<{ status: number; data: unknown }> {
    const options: RequestInit = {
        method,
        headers: { "Content-Type": "application/json" },
    };

    if (body !== undefined && method !== "GET") {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(targetUrl, options);
    const data = await response.json();
    return { status: response.status, data };
}

export async function gatewayRoutes(app: FastifyInstance): Promise<void> {

    // -----------------------------------------------------------------------
    // Book Search  →  book-search-service
    // GET /api/books/search?q=<term>
    // -----------------------------------------------------------------------
    app.get<{ Querystring: { q: string } }>(
        "/api/books/search",
        async (request, reply) => {
            const q = request.query.q;

            if (!q || q.trim() === "") {
                return reply.status(400).send({ error: "Query parameter 'q' is required" });
            }

            try {
                const { status, data } = await proxyRequest(
                    `${BOOK_SEARCH_URL}/search?q=${encodeURIComponent(q)}`,
                    "GET"
                );
                return reply.status(status).send(data);
            } catch (err) {
                app.log.error(err);
                return reply.status(503).send({ error: "Book Search Service unavailable" });
            }
        }
    );

    // -----------------------------------------------------------------------
    // Recent searches  →  book-search-service
    // GET /api/books/recent?limit=<number>
    // -----------------------------------------------------------------------
    app.get<{ Querystring: { limit?: string } }>(
        "/api/books/recent",
        async (request, reply) => {
            const limit = request.query.limit;
            const qs = limit !== undefined ? `?limit=${encodeURIComponent(limit)}` : "";

            try {
                const { status, data } = await proxyRequest(
                    `${BOOK_SEARCH_URL}/recent${qs}`,
                    "GET"
                );
                return reply.status(status).send(data);
            } catch (err) {
                app.log.error(err);
                return reply.status(503).send({ error: "Book Search Service unavailable" });
            }
        }
    );

    // -----------------------------------------------------------------------
    // Add book to library  →  book-library-service
    // POST /api/library/:userId/books
    // -----------------------------------------------------------------------
    app.post<{
        Params: { userId: string };
        Body: { id: string; title: string; authors: string[] };
    }>(
        "/api/library/:userId/books",
        async (request, reply) => {
            const { userId } = request.params;

            try {
                const { status, data } = await proxyRequest(
                    `${BOOK_LIBRARY_URL}/library/${userId}/books`,
                    "POST",
                    request.body
                );
                return reply.status(status).send(data);
            } catch (err) {
                app.log.error(err);
                return reply.status(503).send({ error: "Book Library Service unavailable" });
            }
        }
    );

    // -----------------------------------------------------------------------
    // Get user library  →  book-library-service
    // GET /api/library/:userId/books
    // -----------------------------------------------------------------------
    app.get<{ Params: { userId: string } }>(
        "/api/library/:userId/books",
        async (request, reply) => {
            const { userId } = request.params;

            try {
                const { status, data } = await proxyRequest(
                    `${BOOK_LIBRARY_URL}/library/${userId}/books`,
                    "GET"
                );
                return reply.status(status).send(data);
            } catch (err) {
                app.log.error(err);
                return reply.status(503).send({ error: "Book Library Service unavailable" });
            }
        }
    );

    // -----------------------------------------------------------------------
    // Gateway health check — also pings downstream services
    // GET /api/health
    // -----------------------------------------------------------------------
    app.get("/api/health", async (_request, reply) => {
        const results = await Promise.allSettled([
            proxyRequest(`${BOOK_SEARCH_URL}/health`, "GET"),
            proxyRequest(`${BOOK_LIBRARY_URL}/health`, "GET"),
        ]);

        const [searchResult, libraryResult] = results;

        const health = {
            gateway: "ok",
            services: {
                bookSearch: searchResult.status === "fulfilled" ? "ok" : "unavailable",
                bookLibrary: libraryResult.status === "fulfilled" ? "ok" : "unavailable",
            },
        };

        const allOk = Object.values(health.services).every((s) => s === "ok");
        return reply.status(allOk ? 200 : 207).send(health);
    });
}
