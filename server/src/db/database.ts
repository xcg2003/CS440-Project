import Database from 'better-sqlite3';
import type { Database as SQLiteDatabase } from 'better-sqlite3';

export function createDatabase(): SQLiteDatabase {
    const db = new Database('bookApp.db');
    db.pragma('journal_mode = WAL');
    return db;
}
