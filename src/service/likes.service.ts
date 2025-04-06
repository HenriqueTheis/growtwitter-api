import { prismaClient } from "../database/prisma.client";
import { toggleLikeDTO } from "../dtos/like.dto";

export class LikesService {
  public async toggleLike({ userId, tweetId }: toggleLikeDTO): Promise<string> {
    const registroExiste = await prismaClient.like.findUnique({
      where: {
        userId_tweetId: {
          userId,
          tweetId,
        },
      },
    });

    if (registroExiste) {
      await prismaClient.like.delete({
        where: {
          userId_tweetId: {
            userId,
            tweetId,
          },
        },
      });
      return "Deslike realizado com sucesso";
    }

    await prismaClient.like.create({
      data: {
        userId,
        tweetId,
      },
    });

    return "Like realizado com sucesso";
  }
}
