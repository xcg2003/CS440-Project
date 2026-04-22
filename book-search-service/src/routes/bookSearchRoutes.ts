import type { FastifyInstance } from "fastify";
import { BookSearchService } from "../services/BookSearch.js";
import { GoogleBooksAdapter } from "../external/GoogleBooksAdapter.js";
import { SearchHistoryRepository } from "../repository/search.repository.js";
import type { Database as SQLiteDatabase } from "better-sqlite3";

export async function bookSearchRoutes(
    app: FastifyInstance,
    options: { db: SQLiteDatabase }
): Promise<void> {
    const apiKey = process.env["GOOGLE_API_KEY"] ?? "";
    const adapter = new GoogleBooksAdapter(apiKey);
    const searchService = new BookSearchService(adapter);
    const searchHistoryRepo = new SearchHistoryRepository(options.db);

    app.get<{ Querystring: { q: string } }>("/search", async (request, reply) => {
        const { q } = request.query;

        if (!q || q.trim() === "") {
            return reply.status(400).send({ error: "Query parameter 'q' is required" });
        }

        const result = await searchService.search(q);

        if (!result.success) {
            return reply.status(502).send({ error: "Failed to fetch results from Google Books" });
        }

        // Persist the search term after a successful result
        searchHistoryRepo.insertSearch(q.trim());

        return reply.status(200).send({ books: result.books });
    });

    // Returns the most recently searched terms, newest first
    app.get<{ Querystring: { limit?: string } }>("/recent", async (request, reply) => {
        const limitParam = request.query.limit;
        const limit = limitParam !== undefined ? parseInt(limitParam, 10) : 20;

        if (isNaN(limit) || limit < 1) {
            return reply.status(400).send({ error: "limit must be a positive integer" });
        }

        const searches = searchHistoryRepo.getRecentSearches(limit);
        return reply.status(200).send({ searches });
    });
}
