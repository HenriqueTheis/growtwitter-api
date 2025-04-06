import { Router } from "express";
import { RetweetsController } from "../controller/retweets.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export class RetweetsRoutes {
  public static bind(): Router {
    const router = Router();
    const retweetsController = new RetweetsController();

    router.patch("/retweets", authMiddleware, retweetsController.toggle);

    return router;
  }
}
