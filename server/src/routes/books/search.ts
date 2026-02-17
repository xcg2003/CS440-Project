import type { FastifyInstance } from "fastify";
import type { BookSearchService } from "../../services/BookSearchService.js";

interface SearchBody {
    searchTerm?: string;
}

export default async function searchRoute(app: FastifyInstance, bookSearchService: BookSearchService) {
    app.post<{ Body: SearchBody }>("/search", async (request, reply) => {
        const searchTerm = request.body?.searchTerm ?? "";
        const results = await bookSearchService.search(searchTerm);

        return reply.send({
            success: results.success,
            books: results.books.map((b) => ({
                id: b.id,
                title: b.title,
                authors: b.authors,
            })),
        });
    });
}
