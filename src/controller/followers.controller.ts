import { Request, Response } from "express";
import { onError } from "../utils/on-error";

export class FollowersController {
    
    public async toggle(req: Request, res: Response): Promise<void> {
        try{
            const user = req.userLogado.id
            const { userId } = req.body;

            res.status(200).json({
                sucesso: true,
                mensagem: "seguir ou add",
            })
        }catch(error){
            onError(error, res);
        }
    }
}