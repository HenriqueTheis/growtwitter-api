import { Router } from 'express';
import { TweetsController } from '../controller/twetts.controller';

export class TweetsRoutes {
    public static bind(): Router {
        const router = Router();
        const controller = new TweetsController();

        router.get("/tweets", controller.listar);
        router.get("/tweets/:id", controller.obterPorId);
        router.post("/tweets", controller.criar);
        router.put("/tweets/:id", controller.atualizarPorId);
        router.delete("/tweets/:id", controller.deletarPorId);

        return router;
    }
}
