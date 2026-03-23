import { StaticController } from '../controllers/StaticController.js';
export async function staticRoutes(app) {
    const staticController = new StaticController();
    app.get('/', (req, reply) => staticController.serveSearch(req, reply));
    app.get('/library', (req, reply) => staticController.serveLibrary(req, reply));
}
//# sourceMappingURL=staticRoutes.js.map