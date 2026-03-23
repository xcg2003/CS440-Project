import type { FastifyRequest, FastifyReply } from 'fastify';
import type { BookRepository } from '../models/BookRepository.js';
export declare const SHARED_USER_ID = 1;
interface AddToLibraryBody {
    id?: string;
    title?: string;
    authors?: string[];
}
export declare class LibraryController {
    private readonly bookRepo;
    constructor(bookRepo: BookRepository);
    addBook(request: FastifyRequest<{
        Body: AddToLibraryBody;
    }>, reply: FastifyReply): Promise<void>;
    getLibrary(_request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
export {};
//# sourceMappingURL=LibraryController.d.ts.map