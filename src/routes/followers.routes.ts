import { Router } from "express";
import { FollowersController } from "../controller/followers.controller"

export class FollowersRoutes{

    public static bind(): Router{
        const router = Router();

        const followersController = new FollowersController()

        router.get("/followers", followersController.listar);         
        router.post("/followers", followersController.seguir);        
        router.delete("/followers/:id", followersController.deletarPorId);  

        return router
    }
}