import Database from "better-sqlite3";
import type { Database as SQLiteDatabase } from "better-sqlite3";

export function createDatabase(): SQLiteDatabase {
    const db = new Database("bookLibrary.db");
    db.pragma("journal_mode = WAL");
    initSchema(db);
    return db;
}

// Runs the schema from schema.sql inline so the service is self-contained
function initSchema(db: SQLiteDatabase): void {
    db.exec(`
        CREATE TABLE IF NOT EXISTS Books (
            book_id   INTEGER PRIMARY KEY AUTOINCREMENT,
            title     TEXT    NOT NULL,
            author    TEXT,
            user_id   INTEGER
        );

        CREATE TABLE IF NOT EXISTS Authors (
            author_id   INTEGER PRIMARY KEY AUTOINCREMENT,
            author_name TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Book_Author (
            book_id   INTEGER,
            author_id INTEGER,
            PRIMARY KEY (book_id, author_id),
            FOREIGN KEY (book_id)   REFERENCES Books(book_id),
            FOREIGN KEY (author_id) REFERENCES Authors(author_id)
        );
    `);
}
