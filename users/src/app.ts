import fastify from 'fastify';
import { userRoutes } from './routes/userRoutes.js';
import { createDatabase } from './db/database.js';
import { UserRepository } from './repository/user.repository.js';

export function buildApp() {
    const app = fastify();

    const db = createDatabase();
    const userRepo = new UserRepository(db);

    app.register(userRoutes, { userRepo });

    return app;
}

