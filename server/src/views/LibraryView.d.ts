import type { LibraryBookRow } from '../models/BookRepository.js';
export interface LibraryResponse {
    books: LibraryBookItem[];
}
export interface LibraryBookItem {
    id: number;
    title: string;
    author: string;
}
export interface AddToLibraryResponse {
    ok: boolean;
}
export declare class LibraryView {
    static renderLibrary(rows: LibraryBookRow[]): LibraryResponse;
    static renderAddSuccess(): AddToLibraryResponse;
}
//# sourceMappingURL=LibraryView.d.ts.map