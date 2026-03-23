import fastify from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

import { createDatabase } from './db/database.js';
import { BookRepository } from './models/BookRepository.js';
import { GoogleBooksAdapter } from './external/GoogleBooksAdapter.js';
import { bookRoutes } from './routes/bookRoutes.js';
import { userRoutes } from './routes/userRoutes.js';
import { staticRoutes } from './routes/staticRoutes.js';
import { SHARED_USER_ID } from './controllers/LibraryController.js';

export function buildApp() {
    dotenv.config();

    const app = fastify();

    const db = createDatabase();
    const bookRepo = new BookRepository(db);

    // Ensure the single shared user exists for the prototype
    const ensureUser = db.prepare(
        "INSERT OR IGNORE INTO Users (user_id, username, password) VALUES (?, ?, ?)"
    );
    ensureUser.run(SHARED_USER_ID, "shared", "");

    // Serve static files
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.register(fastifyStatic, {
        root: path.join(__dirname, '../../client'),
    });

    const googleBooksAdapter = new GoogleBooksAdapter(process.env.GOOGLE_API_KEY);

    app.register(staticRoutes);
    app.register(bookRoutes, { googleBooksAdapter, bookRepo });
    app.register(userRoutes);

    return app;
}
