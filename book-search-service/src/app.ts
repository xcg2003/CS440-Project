import fastify from "fastify";
import { bookSearchRoutes } from "./routes/bookSearchRoutes.js";
import { createDatabase } from "./db/database.js";

export function buildApp() {
    const app = fastify({ logger: true });
    const db = createDatabase();

    app.register(bookSearchRoutes, { db });

    return app;
}
