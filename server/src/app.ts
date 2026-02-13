import fastify from 'fastify';
import { userRoutes } from './routes/users/users.js';

export function buildApp() {
    const app = fastify();

    app.register(userRoutes);

    return app;
}

