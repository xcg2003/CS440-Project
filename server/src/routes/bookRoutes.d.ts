import type { FastifyInstance } from 'fastify';
import type { GoogleBooksAdapter } from '../external/GoogleBooksAdapter.js';
import type { BookRepository } from '../models/BookRepository.js';
interface BookRoutesOptions {
    googleBooksAdapter: GoogleBooksAdapter;
    bookRepo: BookRepository;
}
export declare function bookRoutes(app: FastifyInstance, opts: BookRoutesOptions): Promise<void>;
export {};
//# sourceMappingURL=bookRoutes.d.ts.map