import type { Database as SQLiteDatabase } from 'better-sqlite3';
import type { Book } from '../domain/book.js';

export interface LibraryBookRow {
    book_id: number;
    title: string;
    author: string;
    user_id: number;
}

export class BookRepository {
    constructor(
        private db: SQLiteDatabase
    ) {}

    public insertLibraryBook(book: Book, userId: number): void {
        const author = book.authors.length > 0 ? book.authors.join(", ") : "";
        const insert = this.db.prepare(
            "INSERT INTO Books (title, author, user_id) VALUES (?, ?, ?)"
        );
        insert.run(book.title, author, userId);
    }

    public getLibraryBooks(userId: number): LibraryBookRow[] {
        const stmt = this.db.prepare(
            "SELECT book_id, title, author, user_id FROM Books WHERE user_id = ? ORDER BY book_id DESC"
        );
        return stmt.all(userId) as LibraryBookRow[];
    }
}
