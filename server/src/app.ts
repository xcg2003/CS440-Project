import fastify from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';

import { userRoutes } from './routes/users/users.js';
import { booksRoutes } from './routes/books/books.js';
import { GoogleBooksAdapter } from './external/GoogleBooksAdapter.js';
import { staticRoutes } from './routes/static/static.js';

import * as dotenv from 'dotenv';

export function buildApp() {
    const app = fastify();

    dotenv.config();

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
        googleBooksAdapter
    });

    app.register(userRoutes);

    return app;
}

