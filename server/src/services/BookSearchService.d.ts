import { Book } from '../models/Book.js';
import type { GoogleBooksAdapter } from '../external/GoogleBooksAdapter.js';
type SearchResults = {
    success: boolean;
    books: Book[];
};
export declare class BookSearchService {
    private readonly googleBooksAdapter;
    constructor(googleBooksAdapter: GoogleBooksAdapter);
    search(searchTerm: string): Promise<SearchResults>;
}
export {};
//# sourceMappingURL=BookSearchService.d.ts.map