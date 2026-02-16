import { GoogleBooksResponse } from "./google-books.types";

export class GoogleBooksAdapter {
    constructor(

    ) {}

    async getBookTitles(title: string): Promise<string[]> {
        const API_KEY = process.env.GOOGLE_API_KEY;
        const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&key=${API_KEY}`;

        let bookTitles: string[] = [];
        try {
            const response = await fetch(searchUrl);
            let results = await response.json();

            if(results.totalItems === 0){
                return bookTitles;
            }

            results.items.forEach(item => {
                const titles = item.volumeInfo.title;
                bookTitles.push(titles ? titles : "No Title Found");
            });

            return bookTitles;
        } catch(error) {
            console.log(error);
        }
    }
}
