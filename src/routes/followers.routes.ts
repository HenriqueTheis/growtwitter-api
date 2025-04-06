import { Router } from "express";
import { FollowersController } from "../controller/followers.controller"

export class FollowersRoutes{

    public static bind(): Router{
        const router = Router();

        const followersController = new FollowersController()

        router.patch("/followers", followersController.toggle);

        return router
    }
}