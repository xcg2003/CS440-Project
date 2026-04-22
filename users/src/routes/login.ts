import type { FastifyInstance } from "fastify";
import { UserRepository } from "../repository/user.repository.js";

interface LoginBody {
    username: string;
    password: string;
}

export default async function login(app: FastifyInstance, userRepo: UserRepository) {
    app.post<{ Body: LoginBody }>('/login', async (request, reply) => {
        const { username, password } = request.body;

        if (!username || !password) {
            return reply.status(400).send({ error: "username and password are required" });
        }

        const user = await userRepo.validateCredentials(username, password);

        if (!user) {
            return reply.status(401).send({ error: "Invalid username or password" });
        }

        return reply.status(200).send({ userId: user.user_id, username: user.username });
    });
}
