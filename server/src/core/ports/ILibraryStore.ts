import type { Book } from '../domain/book.js';

export interface LibraryBookRow {
    book_id: number;
    title: string;
    author: string;
    user_id: number;
}

export interface ILibraryStore {
    insertBook(book: Book, userId: number): void;
    getBooks(userId: number): LibraryBookRow[];
}
