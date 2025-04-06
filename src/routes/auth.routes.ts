import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export class AuthRoutes {
  public static bind() {
    const router = Router();
    const controller = new AuthController();

    router.post("/login", controller.login);
    router.post("/logout", authMiddleware, controller.logout);

    return router;
  }
}
