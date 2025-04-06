import { Request, Response } from "express";
import { onError } from "../utils/on-error";
import { FollowersService } from "../service/followers.service";

export class FollowersController {
  public async toggle(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userLogado.id;
      const { userId: followerId } = req.body;

      const service = new FollowersService();
      const resultado = await service.toggleFollower({
        userId,
        followerId: Number(followerId),
      });

      res.status(200).json({
        sucesso: true,
        mensagem: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }
}
