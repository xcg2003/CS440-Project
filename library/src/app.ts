import fastify from 'fastify';
import path from 'path';
import { fileURLToPath } from 'url';

import { libraryRoutes } from './routes/libraryRoutes.js';
import { createDatabase } from './db/database.js';
import { BookRepository } from './repository/book.repository.js';

export function buildApp() {
    const app = fastify();

    const db = createDatabase();
    const userRepo = new BookRepository(db);

    app.register(libraryRoutes);

    return app;
}

