import { Users } from "@prisma/client";
import { prismaClient } from "../database/prisma.client";
import {
  AtualizarUsersDto,
  CadastrarUsersDto,
  ListarUsersDto,
} from "../dtos/users.dto";
import { HTTPError } from "../utils/http.error";

type UserParcial = Omit<Users, "authToken" | "senha">;

export class UsersService {
  public async cadastrar({
    name,
    email,
    username,
    senha,
  }: CadastrarUsersDto): Promise<UserParcial> {
    const emailJaCadastrado = await prismaClient.users.findUnique({
      where: { email },
    });

    if (emailJaCadastrado) {
      throw new HTTPError(409, "E-mail já cadastrado por outro usuário");
    }

    const novoUser = await prismaClient.users.create({
      data: {
        name,
        email,
        username,
        senha,
      },
      omit: {
        authToken: true,
        senha: true,
      },
    });

    return novoUser;
  }

  public async listar({
    name,
  }: ListarUsersDto): Promise<UserParcial[]> {
    const users = await prismaClient.users.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      omit: {
        authToken: true,
        senha: true,
      },
    });

    return users;
  }

  public async ListarPorId(id: number): Promise<UserParcial> {
    const user = await prismaClient.users.findUnique({
      where: { id },
      omit: {
        authToken: true,
        senha: true,
      },
    });

    if (!user) {
      throw new HTTPError(404, "Usuário não encontrado");
    }

    return user;
  }

  public async atualizar({
    id,
    name,
    email,
    username,
    senha,
  }: AtualizarUsersDto): Promise<UserParcial> {
    const userAtualizado = await prismaClient.users.update({
      where: { id },
      data: {
        name,
        email,
        username,
        senha,
      },
      omit: {
        authToken: true,
        senha: true,
      },
    });

    return userAtualizado;
  }

  public async excluir(id: number): Promise<UserParcial> {
    const userExcluido = await prismaClient.users.delete({
      where: { id },
      omit: {
        authToken: true,
        senha: true,
      },
    });

    return userExcluido;
  }
}
