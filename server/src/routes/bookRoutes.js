import { BookSearchService } from '../services/BookSearchService.js';
import { BookSearchController } from '../controllers/BookSearchController.js';
import { LibraryController } from '../controllers/LibraryController.js';
export async function bookRoutes(app, opts) {
    const bookSearchService = new BookSearchService(opts.googleBooksAdapter);
    const bookSearchController = new BookSearchController(bookSearchService);
    const libraryController = new LibraryController(opts.bookRepo);
    app.post('/search', (req, reply) => bookSearchController.search(req, reply));
    app.post('/api/library', (req, reply) => libraryController.addBook(req, reply));
    app.get('/api/library', (req, reply) => libraryController.getLibrary(req, reply));
}
//# sourceMappingURL=bookRoutes.js.map