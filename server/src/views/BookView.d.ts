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
export declare class BookView {
    static renderSearchResults(success: boolean, books: Book[]): BookSearchResponse;
}
//# sourceMappingURL=BookView.d.ts.map