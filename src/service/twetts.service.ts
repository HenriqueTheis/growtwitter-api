import { Tweet } from "@prisma/client";
import { prismaClient } from "../database/prisma.client";
import {
  CadastrarTweetDto,
  ListarTweetsDto,
  AtualizarTweetDto,
} from "../dtos/twetts.dto";
import { HTTPError } from "../utils/http.error";

type TweetParcial = Omit<Tweet, "">;

export class TweetsService {
  public async cadastrar({
    conteudo,
    tipo,
    userId,
  }: CadastrarTweetDto): Promise<TweetParcial> {
    const novoTweet = await prismaClient.tweet.create({
      data: {
        conteudo,
        tipo,
        userId,
      },
    });

    return novoTweet;
  }

  public async listar({
    tipo,
  }: ListarTweetsDto): Promise<TweetParcial[]> {
    const tweets = await prismaClient.tweet.findMany({
      where: {
        tipo,
      },
      include: {
        user: true,
      },
    });

    return tweets;
  }

  public async listarPorId(id: number): Promise<TweetParcial> {
    const tweet = await prismaClient.tweet.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!tweet) {
      throw new HTTPError(404, "Tweet não encontrado");
    }

    return tweet;
  }

  public async atualizar({
    id,
    conteudo,
    tipo,
  }: AtualizarTweetDto): Promise<TweetParcial> {
    const tweetAtualizado = await prismaClient.tweet.update({
      where: { id },
      data: {
        conteudo,
        tipo,
      },
    });

    return tweetAtualizado;
  }

  public async excluir(id: number): Promise<TweetParcial> {
    const tweetExcluido = await prismaClient.tweet.delete({
      where: { id },
    });

    return tweetExcluido;
  }
}

