import { Public } from "@prisma/client/runtime/library";
import { Request, Response } from "express";

export class UsersController {
    public async listar(req: Request, res: Response): Promise<void> {}
    public async listarPorId(req: Request, res: Response): Promise<void> {}
    public async cadastrar(req: Request, res: Response): Promise<void> {}
    public async atualizarPorId(req: Request, res: Response): Promise<void> {}
    public async deletarPorId(req: Request, res: Response): Promise<void> {}
}

export class TweetsController {
    public async listar(req: Request, res: Response): Promise<void> {}
    public async obterPorId(req: Request, res: Response): Promise<void> {}
    public async criar(req: Request, res: Response): Promise<void> {}
    public async atualizarPorId(req: Request, res: Response): Promise<void> {}
    public async deletarPorId(req: Request, res: Response): Promise<void> {}
}

export class LikesController {
    public async listar(req: Request, res: Response): Promise<void> {}
    public async criar(req: Request, res: Response): Promise<void> {}
    public async deletarPorId(req: Request, res: Response): Promise<void> {}
}

export class RetweetsController {
    public async listar(req: Request, res: Response): Promise<void> {}
    public async criar(req: Request, res: Response): Promise<void> {}
    public async deletarPorId(req: Request, res: Response): Promise<void> {}
}

export class FollowersController {
    public async listar(req: Request, res: Response): Promise<void> {}
    public async seguir(req: Request, res: Response): Promise<void> {}
    public async deletarPorId(req: Request, res: Response): Promise<void> {}
}