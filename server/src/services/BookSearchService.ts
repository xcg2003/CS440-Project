import { Book } from "../domain/book.js";
import type { GoogleBooksAdapter } from "../external/GoogleBooksAdapter.js";

type SearchResults = {
    success: boolean,
    books: Book[]
}

export class BookSearchService {
    constructor(
        private readonly googleBooksAdapter: GoogleBooksAdapter
    ){}

    public async search(searchTerm: string): Promise<SearchResults> {
        // Cache stuff will go here

        try {
            const titles = await this.googleBooksAdapter.getBookTitles(searchTerm);
            const books: Book[] = []; 

            titles.forEach(title => {
                const book = new Book("1", title, []);
                books.push(book);
            });

            return {
                success: true,
                books: books
            };
        } catch(error) {
            return {
                success: false,
                books: []
            };
        }
    }
}
