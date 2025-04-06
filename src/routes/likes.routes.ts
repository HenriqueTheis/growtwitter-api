import { Router } from "express";
import { LikesController } from "../controller/likes.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export class LikesRoutes {
  public static bind(): Router {
    const router = Router();
    const likesController = new LikesController();

    router.patch("/likes", authMiddleware, likesController.toggle);

    return router;
  }
}
