import { Router } from "express";
import { TweetsController } from "../controller/twetts.controller";

export class TweetsRoutes {
  public static bind(): Router {
    const router = Router();

    const tweetController = new TweetsController();

    router.get("/tweets", tweetController.listar);
    router.get("/tweets/:id", tweetController.listarPorId);
    router.post("/tweets", tweetController.cadastrar);
    router.put("/tweets/:id", tweetController.atualizar);
    router.delete("/tweets/:id", tweetController.excluir);

    return router;
  }
}
