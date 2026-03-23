import { Book } from '../models/Book.js';
import type { GoogleBooksAdapter } from '../external/GoogleBooksAdapter.js';

type SearchResults = {
    success: boolean;
    books: Book[];
};

export class BookSearchService {
    constructor(
        private readonly googleBooksAdapter: GoogleBooksAdapter
    ) {}

    public async search(searchTerm: string): Promise<SearchResults> {
        try {
            const results = await this.googleBooksAdapter.getBooks(searchTerm);
            const books: Book[] = results.map(
                (r) => new Book(r.id, r.title, r.authors)
            );
            return { success: true, books };
        } catch {
            return { success: false, books: [] };
        }
    }
}
