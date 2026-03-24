import type { FastifyInstance } from "fastify";
import type { IBookSearchProvider } from "../../../../../core/ports/IBookSearchProvider.js";
import type { ILibraryStore } from "../../../../../core/ports/ILibraryStore.js";
import { BookSearchService } from "../../../../../core/services/BookSearchService.js";
import { LibraryService } from "../../../../../core/services/LibraryService.js";
import searchRoute from "./search.js";
import libraryRoute from "./library.js";

export const SHARED_USER_ID = 1;

interface BooksRoutesOptions {
    bookSearchProvider: IBookSearchProvider;
    libraryStore: ILibraryStore;
}

export async function booksRoutes(app: FastifyInstance, opts: BooksRoutesOptions) {
    const bookSearchService = new BookSearchService(opts.bookSearchProvider);
    const libraryService = new LibraryService(opts.libraryStore);
    searchRoute(app, bookSearchService);
    libraryRoute(app, libraryService);
}
