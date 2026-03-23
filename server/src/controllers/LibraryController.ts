import type { FastifyRequest, FastifyReply } from 'fastify';
import { Book } from '../models/Book.js';
import type { BookRepository } from '../models/BookRepository.js';
import { LibraryView } from '../views/LibraryView.js';

// Single shared user id for the prototype — everyone is this user.
export const SHARED_USER_ID = 1;

interface AddToLibraryBody {
    id?: string;
    title?: string;
    authors?: string[];
}

export class LibraryController {
    constructor(
        private readonly bookRepo: BookRepository
    ) {}

    async addBook(
        request: FastifyRequest<{ Body: AddToLibraryBody }>,
        reply: FastifyReply
    ): Promise<void> {
        const body = request.body ?? {};
        const id = body.id ?? "";
        const title = body.title ?? "";
        const authors = Array.isArray(body.authors) ? body.authors : [];
        const book = new Book(id, title, authors);

        this.bookRepo.insertLibraryBook(book, SHARED_USER_ID);
        reply.send(LibraryView.renderAddSuccess());
    }

    async getLibrary(
        _request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> {
        const rows = this.bookRepo.getLibraryBooks(SHARED_USER_ID);
        reply.send(LibraryView.renderLibrary(rows));
    }
}
