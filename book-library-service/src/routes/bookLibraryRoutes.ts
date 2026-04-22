import type { FastifyInstance } from "fastify";
import { BookRepository } from "../repository/book.repository.js";
import { Book } from "../domain/book.js";
import type { Database as SQLiteDatabase } from "better-sqlite3";

interface AddBookBody {
    id: string;
    title: string;
    authors: string[];
}

export async function bookLibraryRoutes(
    app: FastifyInstance,
    options: { db: SQLiteDatabase }
): Promise<void> {
    const bookRepo = new BookRepository(options.db);

    app.post<{
        Params: { userId: string };
        Body: AddBookBody;
    }>("/library/:userId/books", async (request, reply) => {
        const userId = parseInt(request.params.userId, 10);

        if (isNaN(userId)) {
            return reply.status(400).send({ error: "Invalid userId" });
        }

        const { id, title, authors } = request.body;

        if (!id || !title) {
            return reply.status(400).send({ error: "id and title are required" });
        }

        const book = new Book(id, title, authors ?? []);
        bookRepo.insertLibraryBook(book, userId);

        return reply.status(201).send({ message: "Book added to library" });
    });

    app.get<{
        Params: { userId: string };
    }>("/library/:userId/books", async (request, reply) => {
        const userId = parseInt(request.params.userId, 10);

        if (isNaN(userId)) {
            return reply.status(400).send({ error: "Invalid userId" });
        }

        const books = bookRepo.getLibraryBooks(userId);
        return reply.status(200).send({ books });
    });
}
