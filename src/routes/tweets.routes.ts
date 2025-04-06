import { Router } from 'express';
import { TweetsController } from '../controller/twetts.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export class TweetsRoutes {
  public static bind(): Router {
    const router = Router();
    const tweetController = new TweetsController();

    router.get("/tweets", authMiddleware, tweetController.listar);
    router.get("/tweets/:id", authMiddleware, tweetController.listarPorId);
    router.post("/tweets", authMiddleware, tweetController.cadastrar);
    router.put("/tweets/:id", authMiddleware, tweetController.atualizar);
    router.delete("/tweets/:id", authMiddleware, tweetController.excluir);

    return router;
  }
}

