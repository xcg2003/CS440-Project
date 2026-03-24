import type { FastifyInstance } from "fastify";

export default async function login(app: FastifyInstance) {
    app.post('/login', async (request, reply) => {
        return 'Login endpoint\n';
    });
}
