import { Router } from 'express';
import { UsersController } from '../controller/users.controller';
import { TweetsRoutes } from './tweets.routes';

export class UsersRoutes {
    public static bind(): Router {
        const router = Router();

        const userController = new UsersController();
     
        router.get("/users", userController.listar);        
        router.get("/users/:id", userController.ListarPorId);   
        router.post("/users", userController.cadastrar);      
        router.put("/users/:id", userController.atualizarPorId);    

        router.use("aluno/:id", TweetsRoutes.bind());

        return router;
    }
}
