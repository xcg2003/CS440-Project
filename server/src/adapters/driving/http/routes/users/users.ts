import type { FastifyInstance } from "fastify";
import login from "./login.js";

export async function userRoutes(app: FastifyInstance) {
    login(app);
}
