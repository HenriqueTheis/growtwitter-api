import { Router } from 'express';
import { UsersController } from '../controller/users.controller';

export class UsersRoutes {
    public static bind(): Router {
        const router = Router();

        const userController = new UsersController();
     
        router.get("/users", userController.listar);        
        router.get("/users/:id", userController.listarPorId);   
        router.post("/users", userController.cadastrar);      
        router.put("/users/:id", userController.atualizarPorId);    

        return router;
    }
}
