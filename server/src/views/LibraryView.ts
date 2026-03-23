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

export class LibraryView {
    static renderLibrary(rows: LibraryBookRow[]): LibraryResponse {
        return {
            books: rows.map((r) => ({
                id: r.book_id,
                title: r.title,
                author: r.author,
            })),
        };
    }

    static renderAddSuccess(): AddToLibraryResponse {
        return { ok: true };
    }
}
