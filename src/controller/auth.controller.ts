import { Request, Response } from "express";
import { onError } from "../utils/on-error";
import { AuthService } from "../service/auth.service";

export class AuthController {
    public async login (req: Request, res: Response): Promise<void> {
        try{
            const {email, senha} = req.body

            const service = new AuthService();

            const resultado = await service.loginUser({email, senha});

            res.status(200).json({
                sucesso: true,
                mensagem: "login efetuado com sucesso",
                dados: {
                    token: resultado
                }
            })

        }catch (error){
            onError(error, res);
        }
    }
    public async logout (req: Request, res: Response): Promise<void> {
        try{
            const service = new AuthService();
            const resultado = await service.LogoutUser(req.userLogado.id);

            res.status(200).json({
                sucesso: true,
                mensagem: "Logout efetuado com sucesso",
              });

        }catch(error){
            onError(error, res);
        }
    }
}