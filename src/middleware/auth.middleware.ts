import { NextFunction, Request, Response } from "express";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";
import { prismaClient } from "../database/prisma.client";
import { validate as isValidUid} from 'uuid';

export async function authMiddleware( req: Request, res: Response, next: NextFunction){
    try{
        const bearerToken = req.headers.authorization;

        if(!bearerToken){
            throw new HTTPError(401, "Token não autorizado")
        }

        const [, token] = bearerToken.split(" ")

        if(!isValidUid(token)){
            throw new HTTPError(400, "Token formato invalido")
        }

        const userEncontrado = await prismaClient.users.findFirst({
            where:{ authToken: token} ,
        })
        if(!userEncontrado){
            throw new HTTPError(401, "User não econtrado")
        }
        
        req.userLogado = {
            id:userEncontrado.id,
            email: userEncontrado.email,
            name:userEncontrado.name,
        }   
        next();

    } catch (error) {
        onError(error, res);
    }

}

// instalei a blibioteca: npm install uuid
