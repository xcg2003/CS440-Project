import type { FastifyInstance } from "fastify";
import type { GoogleBooksAdapter } from "../../external/GoogleBooksAdapter.js";
import { BookSearchService } from "../../services/BookSearchService.js";
import type { BookRepository } from "../../repository/book.repository.js";
import { Book } from "../../domain/book.js";
import search from "./search.js";

// Single shared user id for the prototype, everyone is this user.
export const SHARED_USER_ID = 1;

interface BooksRoutesOptions {
    googleBooksAdapter: GoogleBooksAdapter;
    bookRepo: BookRepository;
}

interface AddToLibraryBody {
    id?: string;
    title?: string;
    authors?: string[];
}

export async function booksRoutes(app: FastifyInstance, opts: BooksRoutesOptions) {
    const bookSearchService = new BookSearchService(opts.googleBooksAdapter);
    search(app, bookSearchService);

    app.post<{ Body: AddToLibraryBody }>("/api/library", async (request, reply) => {
        const body = request.body ?? {};
        const id = body.id ?? "";
        const title = body.title ?? "";
        const authors = Array.isArray(body.authors) ? body.authors : [];
        const book = new Book(id, title, authors);

        opts.bookRepo.insertLibraryBook(book, SHARED_USER_ID);

        return reply.send({ ok: true });
    });

    app.get("/api/library", async (_request, reply) => {
        const rows = opts.bookRepo.getLibraryBooks(SHARED_USER_ID);

        return reply.send({
            books: rows.map((r) => ({
                id: r.book_id,
                title: r.title,
                author: r.author,
            })),
        });
    });
}
