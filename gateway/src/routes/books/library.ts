import type { FastifyInstance } from "fastify";
import { Book } from "../../domain/book.js";
import type { BookRepository } from "../../repository/book.repository.js";
import { SHARED_USER_ID } from "./books.js";

interface AddToLibraryBody {
    id?: string;
    title?: string;
    authors?: string[];
}

export default async function libraryRoute(app: FastifyInstance, bookRepo: BookRepository) {
    app.post<{ Body: AddToLibraryBody }>("/api/library", async (request, reply) => {
        const body = request.body ?? {};
        const id = body.id ?? "";
        const title = body.title ?? "";
        const authors = Array.isArray(body.authors) ? body.authors : [];
        const book = new Book(id, title, authors);

        bookRepo.insertLibraryBook(book, SHARED_USER_ID);

        return reply.send({ ok: true });
    });

    app.get("/api/library", async (_request, reply) => {
        const rows = bookRepo.getLibraryBooks(SHARED_USER_ID);

        return reply.send({
            books: rows.map((r) => ({
                id: r.book_id,
                title: r.title,
                author: r.author,
            })),
        });
    });
}
