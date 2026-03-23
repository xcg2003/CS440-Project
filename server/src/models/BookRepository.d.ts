import type { Database as SQLiteDatabase } from 'better-sqlite3';
import type { Book } from './Book.js';
export interface LibraryBookRow {
    book_id: number;
    title: string;
    author: string;
    user_id: number;
}
export declare class BookRepository {
    private db;
    constructor(db: SQLiteDatabase);
    insertLibraryBook(book: Book, userId: number): void;
    getLibraryBooks(userId: number): LibraryBookRow[];
}
//# sourceMappingURL=BookRepository.d.ts.map