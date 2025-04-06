import { v4 as randomUUID } from "uuid"
import { prismaClient } from "../database/prisma.client";
import { LoginDto } from "../dtos/auth.dto";
import { HTTPError } from "../utils/http.error";

export class AuthService {
    public async loginUser({email ,senha}: LoginDto): Promise<string> {
        const userEncontrado = await prismaClient.users.findUnique({
            where: { email, senha},
        })

        if(!userEncontrado){
            throw new HTTPError(401, "Credenciais invalidas");
        }

        const token = randomUUID();
        await prismaClient.users.update({
            where: { id: userEncontrado.id},
            data: { authToken: token}
        })

        return token;
    }
    public async LogoutUser(userId: number): Promise<void>{
        await prismaClient.users.update({
            where: { id: userId},
            data: { authToken: null}
        })
    }
}