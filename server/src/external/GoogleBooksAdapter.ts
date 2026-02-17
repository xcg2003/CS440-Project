import type { GoogleBooksResponse } from "./google-books.types.js";

export class GoogleBooksAdapter {
    constructor(
        private readonly apiKey: string
    ) {}

    async getBookTitles(title: string): Promise<string[]> {
        const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&key=${this.apiKey}`;

        let bookTitles: string[] = [];
        try {
            const response = await fetch(searchUrl);
            let results = await response.json() as GoogleBooksResponse;

            if(results.totalItems === 0 || results.items === undefined){
                return bookTitles;
            }

            results.items.forEach(item => {
                const titles = item.volumeInfo.title;
                bookTitles.push(titles ? titles : "No Title Found");
            });

            return bookTitles;
        } catch(error) {
            console.error("GoogleBooksAdapter getBookTitles error:", error);
            throw error;
        }
    }
}
