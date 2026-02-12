import fastify from 'fastify';

export function buildApp() {
    const server = fastify();

    server.get('/', async (request, reply) => {
        return 'Hello World!\n';
    });

    return server;
}

