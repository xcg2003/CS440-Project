import { BookView } from '../views/BookView.js';
export class BookSearchController {
    bookSearchService;
    constructor(bookSearchService) {
        this.bookSearchService = bookSearchService;
    }
    async search(request, reply) {
        const searchTerm = request.body?.searchTerm ?? "";
        const results = await this.bookSearchService.search(searchTerm);
        const response = BookView.renderSearchResults(results.success, results.books);
        reply.send(response);
    }
}
//# sourceMappingURL=BookSearchController.js.map