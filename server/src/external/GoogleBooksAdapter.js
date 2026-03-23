import type { GoogleBooksResponse } from './google-books.types.js';

export interface GoogleBookResult {
    id: string;
    title: string;
    authors: string[];
}

export class GoogleBooksAdapter {
    constructor(
        private readonly apiKey: string | undefined
    ) {}

    async getBooks(searchTerm: string): Promise<GoogleBookResult[]> {
        if (!this.apiKey) {
            console.error("GoogleBooksAdapter: GOOGLE_API_KEY is not set in .env");
            throw new Error("Missing GOOGLE_API_KEY");
        }

        const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&key=${this.apiKey}`;
        console.log(`GoogleBooksAdapter: fetching ${searchUrl}`);

        try {
            const response = await fetch(searchUrl);

            if (!response.ok) {
                console.error(`GoogleBooksAdapter: HTTP ${response.status} - ${response.statusText}`);
                throw new Error(`Google Books API returned ${response.status}`);
            }

            const results = await response.json() as GoogleBooksResponse;
            console.log(`GoogleBooksAdapter: totalItems=${results.totalItems}`);

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