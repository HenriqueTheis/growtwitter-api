import { Router } from "express";

export class AuthRoutes{
    public static bind(){
        const router = Router();

        router.post("/login");
        router.post("/logout")

    }
}