import { Router } from "express";
import { FollowersController } from "../controller/followers.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export class FollowersRoutes {
  public static bind(): Router {
    const router = Router();

    const followersController = new FollowersController();

    router.patch("/followers", authMiddleware, followersController.toggle);

    return router;
  }
}
