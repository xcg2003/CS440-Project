import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import type { GoogleBooksAdapter } from "../../external/GoogleBooksAdapter.js";
import { BookSearchService } from "../../services/BookSearchService.js";
import search from "./search.js";

interface BooksRoutesOptions {
    googleBooksAdapter: GoogleBooksAdapter;
    bookRepo: BookRepository;
    userRepo: UserRepository;
}

export async function booksRoutes(app: FastifyInstance, opts: BooksRoutesOptions) {
    const bookSearchService = new BookSearchService(
        opts.googleBooksAdapter
    );

    search(app, bookSearchService);
}
