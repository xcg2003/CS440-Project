import { UserController } from '../controllers/UserController.js';
export async function userRoutes(app) {
    const userController = new UserController();
    app.post('/login', (req, reply) => userController.login(req, reply));
}
//# sourceMappingURL=userRoutes.js.map