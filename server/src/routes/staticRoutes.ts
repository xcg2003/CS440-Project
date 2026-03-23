import type { FastifyInstance } from 'fastify';
import { StaticController } from '../controllers/StaticController.js';

export async function staticRoutes(app: FastifyInstance): Promise<void> {
    const staticController = new StaticController();

    app.get('/', (req, reply) => staticController.serveSearch(req, reply));
    app.get('/library', (req, reply) => staticController.serveLibrary(req, reply));
}
