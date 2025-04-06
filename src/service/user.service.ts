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

    const novoUsuario = await prismaClient.users.create({
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

    return novoUsuario;
  }

  public async listar({ name }: ListarUsersDto): Promise<UserParcial[]> {
    const usuarios = await prismaClient.users.findMany({
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

    return usuarios;
  }

  public async ListarPorId(id: number): Promise<UserParcial> {
    const usuario = await prismaClient.users.findUnique({
      where: { id },
      omit: {
        authToken: true,
        senha: true,
      },
    });

    if (!usuario) {
      throw new HTTPError(404, "Usuário não encontrado");
    }

    return usuario;
  }

  public async atualizar({
    id,
    name,
    email,
    username,
    senha,
  }: AtualizarUsersDto): Promise<UserParcial> {
    await this.ListarPorId(id);

    const usuarioAtualizado = await prismaClient.users.update({
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

    return usuarioAtualizado;
  }

  public async excluir(id: number): Promise<UserParcial> {
    await this.ListarPorId(id);

    const usuarioExcluido = await prismaClient.users.delete({
      where: { id },
      omit: {
        authToken: true,
        senha: true,
      },
    });

    return usuarioExcluido;
  }
}
