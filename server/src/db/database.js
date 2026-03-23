import Database from 'better-sqlite3';
export function createDatabase() {
    const db = new Database('bookApp.db');
    db.pragma('journal_mode = WAL');
    return db;
}
//# sourceMappingURL=database.js.map