import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
import { gatewayRoutes } from "./routes/gatewayRoutes.js";

export function buildApp() {
    const app = fastify({ logger: true });

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const clientRoot = path.join(__dirname, "../client");

    app.register(fastifyStatic, { root: clientRoot });

    app.get("/", (_req, reply) => reply.sendFile("searchBook.html"));
    app.get("/library", (_req, reply) => reply.sendFile("viewLibrary.html"));
    app.get("/login", (_req, reply) => reply.sendFile("login.html"));
    app.get("/signup", (_req, reply) => reply.sendFile("signup.html"));

    app.register(gatewayRoutes);

    return app;
}
