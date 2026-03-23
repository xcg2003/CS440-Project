import type { Book } from '../models/Book.js';

export interface BookSearchResponse {
    success: boolean;
    books: BookSearchItem[];
}

export interface BookSearchItem {
    id: string;
    title: string;
    authors: string[];
}

export class BookView {
    static renderSearchResults(success: boolean, books: Book[]): BookSearchResponse {
        return {
            success,
            books: books.map((b) => ({
                id: b.id,
                title: b.title,
                authors: b.authors,
            })),
        };
    }
}
