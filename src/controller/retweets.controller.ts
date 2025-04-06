import { Request, Response } from "express";
import { RetweetsService } from "../service/retweets.service";
import { onError } from "../utils/on-error";

export class RetweetsController {
  public async toggle(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userLogado.id;
      const { tweetId } = req.body;

      const service = new RetweetsService();
      const resultado = await service.toggleRetweet({ userId, tweetId });

      res.status(200).json({
        sucesso: true,
        mensagem: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }
}
