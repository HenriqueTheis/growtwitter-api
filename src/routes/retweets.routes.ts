import { Router } from "express";
import { RetweetsController } from "../controller/retweets.controller";

export class RetweetsRoutes {
    public static bind(): Router {
        const router = Router();

        const retweetsController = new RetweetsController();

        router.get("/retweets", retweetsController.listar);         
        router.post("/retweets", retweetsController.criar);        
        router.delete("/retweets/:id", retweetsController.deletarPorId);  

        return router;
    }
}
    