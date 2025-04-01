import { User } from "@prisma/client";
import { prismaClient } from "../database/prisma.client";
import { ListarUsersDto, CadastrarUserDto } from "../dtos/users.dto";
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
    // ...

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
}