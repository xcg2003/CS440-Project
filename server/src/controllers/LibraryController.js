import { Book } from '../models/Book.js';
import { LibraryView } from '../views/LibraryView.js';
// Single shared user id for the prototype — everyone is this user.
export const SHARED_USER_ID = 1;
export class LibraryController {
    bookRepo;
    constructor(bookRepo) {
        this.bookRepo = bookRepo;
    }
    async addBook(request, reply) {
        const body = request.body ?? {};
        const id = body.id ?? "";
        const title = body.title ?? "";
        const authors = Array.isArray(body.authors) ? body.authors : [];
        const book = new Book(id, title, authors);
        this.bookRepo.insertLibraryBook(book, SHARED_USER_ID);
        reply.send(LibraryView.renderAddSuccess());
    }
    async getLibrary(_request, reply) {
        const rows = this.bookRepo.getLibraryBooks(SHARED_USER_ID);
        reply.send(LibraryView.renderLibrary(rows));
    }
}
//# sourceMappingURL=LibraryController.js.map