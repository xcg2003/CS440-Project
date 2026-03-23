import type { FastifyRequest, FastifyReply } from 'fastify';

export class StaticController {
    serveSearch(_request: FastifyRequest, reply: FastifyReply): void {
        reply.sendFile('searchBook.html');
    }

    serveLibrary(_request: FastifyRequest, reply: FastifyReply): void {
        reply.sendFile('viewLibrary.html');
    }
}
