import type { FastifyInstance } from "fastify";

export default async function home(app: FastifyInstance) {
    app.get('/', async (request, reply) => {
        return 'Home Page\n';
    });
}
