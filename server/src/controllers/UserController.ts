import type { FastifyRequest, FastifyReply } from 'fastify';

export class UserController {
    async login(
        _request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> {
        reply.send('Login endpoint\n');
    }
}
