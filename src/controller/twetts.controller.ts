import {Request, Response } from "express";

export class TweetsController {
    public async listar(req: Request, res: Response): Promise<void> {}
    public async obterPorId(req: Request, res: Response): Promise<void> {}
    public async criar(req: Request, res: Response): Promise<void> {}
    public async atualizarPorId(req: Request, res: Response): Promise<void> {}
    public async deletarPorId(req: Request, res: Response): Promise<void> {}
}