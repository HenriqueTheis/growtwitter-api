import { User } from "@prisma/client";
import { prismaClient } from "../database/prisma.client";
import { ListarUsersDto, CadastrarUserDto, AtualizarUserDto } from "../dtos/users.dto";
import { HTTPError } from "../utils/http.error";


type UserParcial = Omit<User, "authToken" | "senha">;

export class UsersService {
  public async cadastrar({
    email,
    nome,
    senha,
    username,
  }: CadastrarUserDto): Promise<UserParcial> {
    const emailJaCadastrado = await prismaClient.user.findUnique({
      where: { email: email },
    });

    if (emailJaCadastrado) {
      throw new HTTPError(409, "E-mail já cadastrado por outro usuário");
    }

    const novoUsuario = await prismaClient.user.create({
      data: {
        nome,
        email,
        senha,
        username,
      },
      omit: {
        authToken: true,
        senha: true,
      },
    });

    return novoUsuario;
  }

  public async listar({ nome }: ListarUsersDto): Promise<UserParcial[]> {
   
    const usersDB = await prismaClient.user.findMany({
      where: {
        nome: {
          contains: nome,
          mode: "insensitive",
        },
      },
      orderBy: {
        nome: "asc",
      },
      omit: {
        authToken: true,
        senha: true,
      },
    });

    return usersDB;
  }
  public async listarPorId(idusuario: string): Promise<UserParcial> {
    const user = await prismaClient.user.findUnique({
      where: { id: idusuario },
      omit: {
        authToken: true,
        senha: true,
      },
    });

    if (!user) {
      throw new HTTPError(404, "Usuario não encontrado");
    }

    return user;
  }

  public async atualizar({
    id,
    email,
    username,
    nome,
    senha,
  }: AtualizarUserDto): Promise<UserParcial> {
    await this.listarPorId(id);

    const usuarioAtualizado = await prismaClient.user.update({
      where: { id },
      data: {
        email,
        username,
        nome,
        senha,
      },
      omit: {
        authToken: true,
        senha: true,
      },
    });

    return usuarioAtualizado;
  }

  public async deletarPorId(idUsuario: string): Promise<UserParcial> {
    await this.listarPorId(idUsuario);

    const UserExcluido = await prismaClient.user.delete({
      where: { id: idUsuario },
      omit: {
        authToken: true,
        senha: true,
      },
    });

    return UserExcluido;
  }
}