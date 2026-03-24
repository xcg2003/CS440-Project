import type { Book } from '../domain/book.js';
import type { ILibraryStore, LibraryBookRow } from '../ports/ILibraryStore.js';

export class LibraryService {
    constructor(private readonly libraryStore: ILibraryStore) {}

    addBook(book: Book, userId: number): void {
        this.libraryStore.insertBook(book, userId);
    }

    getBooks(userId: number): LibraryBookRow[] {
        return this.libraryStore.getBooks(userId);
    }
}
