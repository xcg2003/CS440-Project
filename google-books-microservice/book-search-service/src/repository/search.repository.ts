import type { Database as SQLiteDatabase } from "better-sqlite3";

export interface SearchHistoryRow {
    search_id: number;
    search_term: string;
    searched_at: string;
}

export class SearchHistoryRepository {
    constructor(
        private readonly db: SQLiteDatabase
    ) {}

    public insertSearch(searchTerm: string): void {
        const stmt = this.db.prepare(
            "INSERT INTO SearchHistory (search_term) VALUES (?)"
        );
        stmt.run(searchTerm);
    }

    public getRecentSearches(limit: number = 20): SearchHistoryRow[] {
        const stmt = this.db.prepare(
            "SELECT search_id, search_term, searched_at FROM SearchHistory ORDER BY search_id DESC LIMIT ?"
        );
        return stmt.all(limit) as SearchHistoryRow[];
    }
}
