import type { FastifyRequest, FastifyReply } from 'fastify';
import type { BookSearchService } from '../services/BookSearchService.js';
interface SearchBody {
    searchTerm?: string;
}
export declare class BookSearchController {
    private readonly bookSearchService;
    constructor(bookSearchService: BookSearchService);
    search(request: FastifyRequest<{
        Body: SearchBody;
    }>, reply: FastifyReply): Promise<void>;
}
export {};
//# sourceMappingURL=BookSearchController.d.ts.map