export class BookRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    insertLibraryBook(book, userId) {
        const author = book.authors.length > 0 ? book.authors.join(", ") : "";
        const insert = this.db.prepare("INSERT INTO Books (title, author, user_id) VALUES (?, ?, ?)");
        insert.run(book.title, author, userId);
    }
    getLibraryBooks(userId) {
        const stmt = this.db.prepare("SELECT book_id, title, author, user_id FROM Books WHERE user_id = ? ORDER BY book_id DESC");
        return stmt.all(userId);
    }
}
//# sourceMappingURL=BookRepository.js.map