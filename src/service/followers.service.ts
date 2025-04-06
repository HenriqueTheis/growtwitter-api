import { prismaClient } from "../database/prisma.client";
import { toggleFollowerDTO } from "../dtos/followers.dto";
import { HTTPError } from "../utils/http.error";
 
export class FollowersService{
    public async toggleFollower({userId, followerId}: toggleFollowerDTO): Promise<string> {
        if(userId === followerId){
            throw new HTTPError(409, "não pode ser seguidor dele mesmo");
        }
        const registroExiste = await prismaClient.follower.findUnique({
            where: {
                userId_followerId:{
                    userId,
                    followerId
                },
            }
        })
        
        if(registroExiste){
            await prismaClient.follower.delete({
                where:{
                    userId_followerId:{
                        userId,
                        followerId
                    },
                }
            });
        return "Unfolloware Realizado com sucesso";
        }
        await prismaClient.follower.create({
            data: {
                    userId,
                    followerId
                },
            
        });
        return "followare Realizado com sucesso";
    }
}