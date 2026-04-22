import * as bcrypt from 'bcrypt';
import type { Database as SQLiteDatabase } from 'better-sqlite3';

export interface UserRow {
    user_id: number;
    username: string;
    password: string;
}

export class UserRepository {
    constructor(
        private db: SQLiteDatabase
    ){}

    public insertUser(username: string, password: string): number {
        const insert = this.db.prepare(
            "INSERT INTO Users (username, password) VALUES (?, ?)"
        );
        const result = insert.run(username, password);
        return result.lastInsertRowid as number;
    }

    public isUsernameTaken(username: string): boolean {
        const stmt = this.db.prepare(
            "SELECT * FROM Users WHERE username = ?"
        );
        const user = stmt.get(username);
        return user !== undefined;
    }

    public async validateCredentials(username: string, password: string): Promise<UserRow | null> {
        const stmt = this.db.prepare(
            "SELECT user_id, username, password FROM Users WHERE username = ?"
        );
        const user = stmt.get(username) as UserRow | undefined;

        if (user === undefined) {
            return null;
        }

        const valid = await bcrypt.compare(password, user.password);
        return valid ? user : null;
    }
}
