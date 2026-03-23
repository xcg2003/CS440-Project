export class LibraryView {
    static renderLibrary(rows) {
        return {
            books: rows.map((r) => ({
                id: r.book_id,
                title: r.title,
                author: r.author,
            })),
        };
    }
    static renderAddSuccess() {
        return { ok: true };
    }
}
//# sourceMappingURL=LibraryView.js.map