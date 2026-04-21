import type { GoogleBooksResponse } from "./google-books.types.js";

export interface GoogleBookResult {
    id: string;
    title: string;
    authors: string[];
}

export class GoogleBooksAdapter {
    constructor(
        private readonly apiKey: string
    ) {}

    async getBooks(searchTerm: string): Promise<GoogleBookResult[]> {
        const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&key=${this.apiKey}`;

        try {
            const response = await fetch(searchUrl);
            const results = await response.json() as GoogleBooksResponse;

            if (results.totalItems === 0 || results.items === undefined) {
                return [];
            }

            return results.items.map((item) => ({
                id: item.id,
                title: item.volumeInfo.title ?? "No Title Found",
                authors: item.volumeInfo.authors ?? [],
            }));
        } catch (error) {
            console.error("GoogleBooksAdapter getBooks error:", error);
            throw error;
        }
    }
}
