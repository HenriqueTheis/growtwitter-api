    import { Request, Response } from "express";
    import { UsersService } from "../services/users.service";
    import { onError } from "../utils/on-error";

export class UserController {
  public async listar(req: Request, res: Response): Promise<void> {
    try {
      const { nome } = req.query;

      const service = new UsersService();
      const resultado = await service.listar({
        nome: nome as string | undefined,
      });

      res.status(200).json({sucesso: true, mensagem: "Alunos listados com sucesso",  dados: resultado});
    } catch (error) {
      onError(error, res);
    }
    }
  public async cadastrar(req: Request, res: Response): Promise<void> {

    try {
      const { nome, email, username, senha } = req.body;

      const service = new UsersService();
      const resultado = await service.cadastrar({
        nome,
        email,
        senha,
        username,
      });

      res.status(201).json({sucesso: true, mensagem: "Novo usuario cadastrado",dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
    }
  public async listarPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
      
            const service = new UsersService();
            const resultado = await service.buscarPorId(id);
      
            res.status(200).json({sucesso: true,mensagem: "Usuario encontrado", dados: resultado });
          } catch (error) {
            onError(error, res);
          }
    }
  public async atualizarPorId(req: Request, res: Response): Promise<void> {
        try{
            const { nome, email, username, senha } = req.body;

      const service = new UsersService();
      const resultado = await service.atualizar({
        id: req.userLogado.id,
        nome,
        email,
        senha,
        username,
      });

      res.status(200).json({sucesso: true, mensagem: "Usuario Atualizado", dados: resultado });

        }catch (error) {
      onError(error, res);
    }
    }
  public async deletarPorId(req: Request, res: Response): Promise<void> {
        try {
            const service = new UsersService();
            const resultado = await service.excluir(req.userLogado.id)
            

            res.status(200).json({sucesso: true, mensagem: "Usuario excluido com sucesso",  dados: resultado,});

        } catch (error) {
        onError(error, res);
        }
    }

}