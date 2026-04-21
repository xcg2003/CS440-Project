import type { FastifyInstance } from "fastify";
import type { GoogleBooksAdapter } from "../../external/GoogleBooksAdapter.js";
import { BookSearchService } from "../../services/BookSearchService.js";
import type { BookRepository } from "../../repository/book.repository.js";
import searchRoute from "./search.js";
import libraryRoute from "./library.js";

// Single shared user id for the prototype, everyone is this user.
export const SHARED_USER_ID = 1;

interface BooksRoutesOptions {
    googleBooksAdapter: GoogleBooksAdapter;
    bookRepo: BookRepository;
}

export async function booksRoutes(app: FastifyInstance, opts: BooksRoutesOptions) {
    const bookSearchService = new BookSearchService(opts.googleBooksAdapter);
    searchRoute(app, bookSearchService);
    libraryRoute(app, opts.bookRepo);
}
