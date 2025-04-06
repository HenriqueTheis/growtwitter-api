import { Router } from 'express';
import { UsersController } from '../controller/users.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export class UsersRoutes {
    public static bind(): Router {
        const router = Router();
        const userController = new UsersController();

        router.get("/users", authMiddleware, userController.listar);
        router.get("/users/:id", authMiddleware, userController.ListarPorId);
        router.post("/users", userController.cadastrar);
        router.put("/users/:id", authMiddleware, userController.atualizarPorId);
        router.delete("/users/:id", authMiddleware, userController.deletar); 

        return router;
    }
}
