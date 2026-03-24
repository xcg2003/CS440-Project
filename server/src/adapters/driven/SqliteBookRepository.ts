import type { Database as SQLiteDatabase } from 'better-sqlite3';
import type { Book } from '../../core/domain/book.js';
import type { ILibraryStore, LibraryBookRow } from '../../core/ports/ILibraryStore.js';

export class SqliteBookRepository implements ILibraryStore {
    constructor(
        private readonly db: SQLiteDatabase
    ) {}

    insertBook(book: Book, userId: number): void {
        const author = book.authors.length > 0 ? book.authors.join(", ") : "";
        const insert = this.db.prepare(
            "INSERT INTO Books (title, author, user_id) VALUES (?, ?, ?)"
        );
        insert.run(book.title, author, userId);
    }

    getBooks(userId: number): LibraryBookRow[] {
        const stmt = this.db.prepare(
            "SELECT book_id, title, author, user_id FROM Books WHERE user_id = ? ORDER BY book_id DESC"
        );
        return stmt.all(userId) as LibraryBookRow[];
    }
}
