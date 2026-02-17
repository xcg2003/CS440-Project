import type { Database as SQLiteDatabase } from 'better-sqlite3';
import type { Book } from '../domain/book.js';

export class BookRepository {
    constructor(
        private db: SQLiteDatabase
    ){}

    public insertLibraryBook(book: Book) {
        const insert = this.db.prepare('INSERT INTO ')
    }
}
