import type { Database as SQLiteDatabase } from 'better-sqlite3';

export class UserRepository {
    constructor(
        private db: SQLiteDatabase
    ) {}
}
