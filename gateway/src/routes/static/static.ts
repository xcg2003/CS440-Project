import type { FastifyInstance } from "fastify";

export async function staticRoutes(app: FastifyInstance) {
    app.get('/', (request, reply) => {
        return reply.sendFile('searchBook.html');
    });
    app.get('/library', (request, reply) => {
        return reply.sendFile('viewLibrary.html');
    });
}
