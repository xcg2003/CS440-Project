import type { FastifyInstance } from "fastify";
import home from "./home.js";

export async function userRoutes(app: FastifyInstance) {
    home(app);
}
