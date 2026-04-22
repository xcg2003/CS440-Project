import type { FastifyInstance } from "fastify";

const BOOK_SEARCH_URL = process.env["BOOK_SEARCH_SERVICE_URL"] ?? "http://localhost:3001";
const BOOK_LIBRARY_URL = process.env["BOOK_LIBRARY_SERVICE_URL"] ?? "http://localhost:3002";
const USER_SERVICE_URL = process.env["USER_SERVICE_URL"] ?? "http://localhost:3003";

export async function gatewayRoutes(app: FastifyInstance): Promise<void> {

    app.get<{ Querystring: { q: string } }>("/api/books/search", async (request, reply) => {
        const q = request.query.q;

        try {
            const res = await fetch(`${BOOK_SEARCH_URL}/search?q=${encodeURIComponent(q)}`);
            const data = await res.json();
            return reply.status(res.status).send(data);
        } catch (err) {
            app.log.error(err);
            return reply.status(503).send({ error: "Book Search Service unavailable" });
        }
    });

    app.get<{ Querystring: { limit?: string } }>("/api/books/recent", async (request, reply) => {
        const limit = request.query.limit;
        const qs = limit !== undefined ? `?limit=${encodeURIComponent(limit)}` : "";

        try {
            const res = await fetch(`${BOOK_SEARCH_URL}/recent${qs}`);
            const data = await res.json();
            return reply.status(res.status).send(data);
        } catch (err) {
            app.log.error(err);
            return reply.status(503).send({ error: "Book Search Service unavailable" });
        }
    });

    app.post<{
        Params: { userId: string };
        Body: { id: string; title: string; authors: string[] };
    }>("/api/library/:userId/books", async (request, reply) => {
        const { userId } = request.params;

        try {
            const res = await fetch(`${BOOK_LIBRARY_URL}/library/${userId}/books`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request.body),
            });
            const data = await res.json();
            return reply.status(res.status).send(data);
        } catch (err) {
            app.log.error(err);
            return reply.status(503).send({ error: "Book Library Service unavailable" });
        }
    });

    app.get<{ Params: { userId: string } }>("/api/library/:userId/books", async (request, reply) => {
        const { userId } = request.params;

        try {
            const res = await fetch(`${BOOK_LIBRARY_URL}/library/${userId}/books`);
            const data = await res.json();
            return reply.status(res.status).send(data);
        } catch (err) {
            app.log.error(err);
            return reply.status(503).send({ error: "Book Library Service unavailable" });
        }
    });

    app.post<{ Body: { username: string; password: string } }>("/api/users/signup", async (request, reply) => {
        try {
            const res = await fetch(`${USER_SERVICE_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request.body),
            });
            const data = await res.json();
            return reply.status(res.status).send(data);
        } catch (err) {
            app.log.error(err);
            return reply.status(503).send({ error: "User Service unavailable" });
        }
    });

    app.post<{ Body: { username: string; password: string } }>("/api/users/login", async (request, reply) => {
        try {
            const res = await fetch(`${USER_SERVICE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request.body),
            });
            const data = await res.json();
            return reply.status(res.status).send(data);
        } catch (err) {
            app.log.error(err);
            return reply.status(503).send({ error: "User Service unavailable" });
        }
    });
}
