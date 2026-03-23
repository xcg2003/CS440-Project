import type { FastifyInstance } from 'fastify';
import type { GoogleBooksAdapter } from '../external/GoogleBooksAdapter.js';
import type { BookRepository } from '../models/BookRepository.js';
import { BookSearchService } from '../services/BookSearchService.js';
import { BookSearchController } from '../controllers/BookSearchController.js';
import { LibraryController } from '../controllers/LibraryController.js';

interface BookRoutesOptions {
    googleBooksAdapter: GoogleBooksAdapter;
    bookRepo: BookRepository;
}

export async function bookRoutes(app: FastifyInstance, opts: BookRoutesOptions): Promise<void> {
    const bookSearchService = new BookSearchService(opts.googleBooksAdapter);
    const bookSearchController = new BookSearchController(bookSearchService);
    const libraryController = new LibraryController(opts.bookRepo);

    app.post<{ Body: { searchTerm?: string } }>(
        '/search',
        (req, reply) => bookSearchController.search(req, reply)
    );

    app.post<{ Body: { id?: string; title?: string; authors?: string[] } }>(
        '/api/library',
        (req, reply) => libraryController.addBook(req, reply)
    );

    app.get(
        '/api/library',
        (req, reply) => libraryController.getLibrary(req, reply)
    );
}
