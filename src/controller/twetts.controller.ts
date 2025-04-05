import { Request, Response } from "express";
import { TweetsService } from "../service/twetts.service";
import { onError } from "../utils/on-error";

export class TweetsController {
  public async listar(req: Request, res: Response): Promise<void> {
    try {
      const { tipo } = req.query;

      const service = new TweetsService();
      const resultado = await service.listar({
        tipo: tipo as "TWEET" | "RETWEET" | undefined,
      });

      res.status(200).json({
        sucesso: true,
        mensagem: "Tweets listados com sucesso",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async listarPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const service = new TweetsService();
      const resultado = await service.listarPorId(Number(id));

      res.status(200).json({
        sucesso: true,
        mensagem: "Tweet encontrado",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async cadastrar(req: Request, res: Response): Promise<void> {
    try {
      const { conteudo, tipo, userId } = req.body;

      const service = new TweetsService();
      const resultado = await service.cadastrar({
        conteudo,
        tipo,
        userId: Number(userId),
      });

      res.status(201).json({
        sucesso: true,
        mensagem: "Tweet criado",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { conteudo, tipo } = req.body;

      const service = new TweetsService();
      const resultado = await service.atualizar({
        id: Number(id),
        conteudo,
        tipo,
      });

      res.status(200).json({
        sucesso: true,
        mensagem: "Tweet atualizado",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async excluir(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const service = new TweetsService();
      const resultado = await service.excluir(Number(id));

      res.status(200).json({
        sucesso: true,
        mensagem: "Tweet excluído",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }
}
