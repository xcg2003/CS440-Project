export interface BookSearchResult {
    id: string;
    title: string;
    authors: string[];
}
export interface IBookSearchProvider {
    getBooks(searchTerm: string): Promise<BookSearchResult[]>;
}
