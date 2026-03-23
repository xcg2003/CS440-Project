import { Book } from "../domain/book.js";
import type { BookRepository } from "../repository/book.repository.js";

interface AddToLibraryInput {
    id?: string;
    title?: string;
    authors?: string[];
}

export class LibraryService {
    constructor(
        private readonly bookRepo: BookRepository
    ) {}

    public addToLibrary(input: AddToLibraryInput, userId: number): void {
        const id = input.id ?? "";
        const title = input.title ?? "";
        const authors = Array.isArray(input.authors) ? input.authors : [];
        const book = new Book(id, title, authors);

        this.bookRepo.insertLibraryBook(book, userId);
    }

    public getLibraryBooks(userId: number) {
        return this.bookRepo.getLibraryBooks(userId).map((row) => ({
            id: row.book_id,
            title: row.title,
            author: row.author,
        }));
    }
}
