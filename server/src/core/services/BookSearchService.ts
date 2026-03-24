import { Book } from '../domain/book.js';
import type { IBookSearchProvider } from '../ports/IBookSearchProvider.js';

type SearchResults = {
    success: boolean;
    books: Book[];
};

export class BookSearchService {
    constructor(
        private readonly bookSearchProvider: IBookSearchProvider
    ) {}

    public async search(searchTerm: string): Promise<SearchResults> {
        try {
            const results = await this.bookSearchProvider.getBooks(searchTerm);
            const books: Book[] = results.map(
                (r) => new Book(r.id, r.title, r.authors)
            );
            return {
                success: true,
                books
            };
        } catch {
            return {
                success: false,
                books: []
            };
        }
    }
}
