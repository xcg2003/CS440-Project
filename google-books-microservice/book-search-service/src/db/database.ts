import Database from "better-sqlite3";
import type { Database as SQLiteDatabase } from "better-sqlite3";

export function createDatabase(): SQLiteDatabase {
    const db = new Database("bookSearch.db");
    db.pragma("journal_mode = WAL");
    initSchema(db);
    return db;
}

function initSchema(db: SQLiteDatabase): void {
    db.exec(`
        CREATE TABLE IF NOT EXISTS SearchHistory (
            search_id   INTEGER PRIMARY KEY AUTOINCREMENT,
            search_term TEXT    NOT NULL,
            searched_at TEXT    NOT NULL DEFAULT (datetime('now'))
        );
    `);
}
