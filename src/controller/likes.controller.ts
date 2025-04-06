import {Request, Response } from "express";
import { LikesService } from "../service/likes.service";
import { onError } from "../utils/on-error";

export class LikesController {
    public async listar(req: Request, res: Response): Promise<void> {}
    public async criar(req: Request, res: Response): Promise<void> {
        try {
            const {userID, tweetID} = req.body;

            const service = new LikesService();
            const resultado = await service.criar({
                userID: Number(userID),
                tweetID: Number(tweetID) 
             })

             res.status(201).json({sucesso: true, mensagem: 'tweet like com sucesso', dados: resultado});

        }catch(error){
            onError(error, res);
        }
    }
    public async deletarPorId(req: Request, res: Response): Promise<void> {}
}