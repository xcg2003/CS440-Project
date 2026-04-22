import Database from 'better-sqlite3';
import type { Database as SQLiteDatabase } from 'better-sqlite3';

export function createDatabase(): SQLiteDatabase {
    const db = new Database('usersService.db');
    db.pragma('journal_mode = WAL');
    initSchema(db);
    return db;
}

function initSchema(db: SQLiteDatabase): void {
    db.exec(`
        CREATE TABLE IF NOT EXISTS Users (
            user_id  INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
    `);
}
