export class StaticController {
    serveSearch(_request, reply) {
        reply.sendFile('searchBook.html');
    }
    serveLibrary(_request, reply) {
        reply.sendFile('viewLibrary.html');
    }
}
//# sourceMappingURL=StaticController.js.map