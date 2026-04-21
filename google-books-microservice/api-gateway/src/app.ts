import fastify from "fastify";
import { gatewayRoutes } from "./routes/gatewayRoutes.js";

export function buildApp() {
    const app = fastify({ logger: true });

    app.register(gatewayRoutes);

    return app;
}
