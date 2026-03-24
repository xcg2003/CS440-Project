import fastify from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

import { createDatabase } from '../../../db/database.js';
import { GoogleBooksAdapter } from '../../driven/GoogleBooksAdapter.js';
import { SqliteBookRepository } from '../../driven/SqliteBookRepository.js';
import { booksRoutes, SHARED_USER_ID } from './routes/books/books.js';
import { userRoutes } from './routes/users/users.js';
import { staticRoutes } from './routes/static/static.js';

export function buildApp() {
    const app = fastify();

    dotenv.config();

    const db = createDatabase();

    // Ensure the single shared user exists for the prototype
    const ensureUser = db.prepare(
        "INSERT OR IGNORE INTO Users (user_id, username, password) VALUES (?, ?, ?)"
    );
    ensureUser.run(SHARED_USER_ID, "shared", "");

    // Serve static files
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.register(fastifyStatic, {
        root: path.join(__dirname, '../../../../../client'),
    });
    app.register(staticRoutes);

    const bookSearchProvider = new GoogleBooksAdapter(process.env.GOOGLE_API_KEY);
    const libraryStore = new SqliteBookRepository(db);

    // Register routes
    app.register(booksRoutes, {
        bookSearchProvider,
        libraryStore,
    });
    app.register(userRoutes);

    return app;
}
