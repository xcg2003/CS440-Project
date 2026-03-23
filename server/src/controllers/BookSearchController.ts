import type { FastifyRequest, FastifyReply } from 'fastify';
import type { BookSearchService } from '../services/BookSearchService.js';
import { BookView } from '../views/BookView.js';

interface SearchBody {
    searchTerm?: string;
}

export class BookSearchController {
    constructor(
        private readonly bookSearchService: BookSearchService
    ) {}

    async search(
        request: FastifyRequest<{ Body: SearchBody }>,
        reply: FastifyReply
    ): Promise<void> {
        const searchTerm = request.body?.searchTerm ?? "";
        const results = await this.bookSearchService.search(searchTerm);
        const response = BookView.renderSearchResults(results.success, results.books);
        reply.send(response);
    }
}
