import { prismaClient } from "../database/prisma.client";
import { toggleRetweetDTO } from "../dtos/retweets.dto";

export class RetweetsService {
  public async toggleRetweet({ userId, tweetId }: toggleRetweetDTO): Promise<string> {
    const registroExiste = await prismaClient.retweet.findUnique({
      where: {
        userId_tweetId: {
          userId,
          tweetId,
        },
      },
    });

    if (registroExiste) {
      await prismaClient.retweet.delete({
        where: {
          userId_tweetId: {
            userId,
            tweetId,
          },
        },
      });
      return "Undo retweet realizado com sucesso";
    }

    await prismaClient.retweet.create({
      data: {
        userId,
        tweetId,
      },
    });

    return "Retweet realizado com sucesso";
  }
}
