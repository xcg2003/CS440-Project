export class BookView {
    static renderSearchResults(success, books) {
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
//# sourceMappingURL=BookView.js.map