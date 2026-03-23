export interface GoogleBookResult {
    id: string;
    title: string;
    authors: string[];
}
export declare class GoogleBooksAdapter {
    private readonly apiKey;
    constructor(apiKey: string | undefined);
    getBooks(searchTerm: string): Promise<GoogleBookResult[]>;
}
//# sourceMappingURL=GoogleBooksAdapter.d.ts.map