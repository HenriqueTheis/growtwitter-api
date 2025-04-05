import { Request, Response } from "express";
import { UsersService } from "../service/user.service";
import { onError } from "../utils/on-error";

export class UsersController {
  public async listar(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.query;

      const service = new UsersService();
      const resultado = await service.listar({
        name: name as string | undefined,
      });

      res.status(200).json({
        sucesso: true,
        mensagem: "Usuários listados com sucesso",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async ListarPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const service = new UsersService();
      const resultado = await service.ListarPorId(Number(id));

      res.status(200).json({
        sucesso: true,
        mensagem: "Usuário encontrado",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async cadastrar(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, username, senha } = req.body;

      const service = new UsersService();
      const resultado = await service.cadastrar({
        name,
        email,
        username,
        senha,
      });

      res.status(201).json({
        sucesso: true,
        mensagem: "Novo usuário cadastrado",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async atualizarPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, email, username, senha } = req.body;

      const service = new UsersService();
      const resultado = await service.atualizar({
        id: Number(id),
        name,
        email,
        username,
        senha,
      });

      res.status(200).json({
        sucesso: true,
        mensagem: "Usuário atualizado",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async deletar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const service = new UsersService();
      const resultado = await service.excluir(Number(id));

      res.status(200).json({
        sucesso: true,
        mensagem: "Usuário excluído",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }
}
