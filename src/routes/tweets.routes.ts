import { Router } from 'express';
import { TweetsController } from '../controller/twetts.controller';

export class TweetsRoutes {
    public static bind(): Router {
        const router = Router();
        const tweetsController = new TweetsController();

        router.get("/tweets", tweetsController.listar);
        router.get("/tweets/:id", tweetsController.obterPorId);
        router.post("/tweets", tweetsController.criar);
        router.put("/tweets/:id", tweetsController.atualizarPorId);
        router.delete("/tweets/:id", tweetsController.deletarPorId);

        return router;
    }
}
