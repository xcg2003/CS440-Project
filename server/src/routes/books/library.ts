import type { FastifyInstance } from "fastify";
import type { LibraryService } from "../../services/LibraryService.js";
import { SHARED_USER_ID } from "./books.js";

interface AddToLibraryBody {
    id?: string;
    title?: string;
    authors?: string[];
}

export default async function libraryRoute(app: FastifyInstance, libraryService: LibraryService) {
    app.post<{ Body: AddToLibraryBody }>("/api/library", async (request, reply) => {
        libraryService.addToLibrary(request.body ?? {}, SHARED_USER_ID);

        return reply.send({ ok: true });
    });

    app.get("/api/library", async (_request, reply) => {
        return reply.send({
            books: libraryService.getLibraryBooks(SHARED_USER_ID),
        });
    });
}
