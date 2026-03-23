import type { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/UserController.js';

export async function userRoutes(app: FastifyInstance): Promise<void> {
    const userController = new UserController();

    app.post('/login', (req, reply) => userController.login(req, reply));
}
