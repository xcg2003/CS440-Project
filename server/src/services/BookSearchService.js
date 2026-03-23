import { Book } from '../models/Book.js';
export class BookSearchService {
    googleBooksAdapter;
    constructor(googleBooksAdapter) {
        this.googleBooksAdapter = googleBooksAdapter;
    }
    async search(searchTerm) {
        try {
            const results = await this.googleBooksAdapter.getBooks(searchTerm);
            const books = results.map((r) => new Book(r.id, r.title, r.authors));
            return { success: true, books };
        }
        catch {
            return { success: false, books: [] };
        }
    }
}
//# sourceMappingURL=BookSearchService.js.map