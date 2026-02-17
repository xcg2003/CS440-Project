import type { FastifyInstance } from "fastify";
import type { BookSearchService } from "../../services/BookSearchService.js";

export default async function search(app: FastifyInstance, bookSearchService: BookSearchService) {
    app.post('/search', async (request, reply) => {
        const searchTerm = request.query.searchTerm;

        const results = await bookSearchService.search(searchTerm);
        if (results.success) {

        } else {

        }

    });
}
