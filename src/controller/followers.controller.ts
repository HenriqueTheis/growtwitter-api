import { Request, Response } from "express";

export class FollowersController {
    public async listar(req: Request, res: Response): Promise<void> {}
    public async seguir(req: Request, res: Response): Promise<void> {}
    public async deletarPorId(req: Request, res: Response): Promise<void> {}
}