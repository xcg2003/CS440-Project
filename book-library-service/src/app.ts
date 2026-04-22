import fastify from "fastify";
import { bookLibraryRoutes } from "./routes/bookLibraryRoutes.js";
import { createDatabase } from "./db/database.js";

export function buildApp() {
    const app = fastify({ logger: true });
    const db = createDatabase();

    app.register(bookLibraryRoutes, { db });

    return app;
}
