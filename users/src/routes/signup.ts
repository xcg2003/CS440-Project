import type { FastifyInstance } from "fastify";
import * as bcrypt from "bcrypt";
import { UserRepository } from "../repository/user.repository.js";

interface SignupBody {
    username: string;
    password: string;
}

export default async function signup(app: FastifyInstance, userRepo: UserRepository) {
    app.post<{ Body: SignupBody }>('/signup', async (request, reply) => {
        const { username, password } = request.body;

        if (!username || !password) {
            return reply.status(400).send({ error: "username and password are required" });
        }

        if (userRepo.isUsernameTaken(username)) {
            return reply.status(400).send({ error: "Username already taken" });
        }

        const hash = await bcrypt.hash(password, 10);
        const userId = userRepo.insertUser(username, hash);

        return reply.status(201).send({ userId, username });
    });
}
