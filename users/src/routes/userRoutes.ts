import type { FastifyInstance } from "fastify";
import { UserRepository } from "../repository/user.repository.js";
import login from "./login.js";
import signup from "./signup.js";

export async function userRoutes(app: FastifyInstance, options: { userRepo: UserRepository }) {
    login(app, options.userRepo);
    signup(app, options.userRepo);
}
