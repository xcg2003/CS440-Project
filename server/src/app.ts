import fastify from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';

import { userRoutes } from './routes/users/users.js';
import { booksRoutes, SHARED_USER_ID } from './routes/books/books.js';
import { GoogleBooksAdapter } from './external/GoogleBooksAdapter.js';
import { staticRoutes } from './routes/static/static.js';
import { createDatabase } from './db/database.js';
import { BookRepository } from './repository/book.repository.js';
import { LibraryService } from './services/LibraryService.js';

import * as dotenv from 'dotenv';

export function buildApp() {
    const app = fastify();

    dotenv.config();

    const db = createDatabase();
    const bookRepo = new BookRepository(db);
    const libraryService = new LibraryService(bookRepo);
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
    app.register(staticRoutes);

    const googleBooksAdapter = new GoogleBooksAdapter(
        process.env.GOOGLE_API_KEY
    );
    app.register(booksRoutes, {
        googleBooksAdapter,
        libraryService,
    });

    app.register(userRoutes);

    return app;
}
