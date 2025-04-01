import { Router } from 'express';
import { LikesController } from '../controller/likes.controller';

export class LikesRoutes{
    public static bind(): Router{
        const router = Router();
        const likesController = new LikesController();
        
        router.get("/likes", likesController.listar);         
        router.post("/likes", likesController.criar);        
        router.delete("/likes/:id", likesController.deletarPorId);  

        return router;
    }
}
