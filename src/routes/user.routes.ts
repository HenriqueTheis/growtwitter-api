import { Router } from 'express';
import { UsersController } from '../controller/users.controller';
import { TweetsController } from '../controller/tweets.controller';
import { LikesController } from '../controller/likes.controller';
import { RetweetsController } from '../controller/retweets.controller';
import { FollowersController } from '../controller/followers.controller';

export class Routes {
    public static bind(): Router {
        const router = Router();

        const userController = new UsersController();
        const tweetsController = new TweetsController();
        const likesController = new LikesController();
        const retweetsController = new RetweetsController();
        const followersController = new FollowersController();

        // Rotas para usuários
        router.get("/users", userController.listar);        
        router.get("/users/:id", userController.listarPorId);   
        router.post("/users", userController.cadastrar);      
        router.put("/users/:id", userController.atualizarPorId);    
        router.delete("/users/:id", userController.deletarPorId); 

        // Rotas para tweets
        router.get("/tweets", tweetsController.listar);        
        router.get("/tweets/:id", tweetsController.obterPorId);    
        router.post("/tweets", tweetsController.criar);       
        router.put("/tweets/:id", tweetsController.atualizarPorId);    
        router.delete("/tweets/:id", tweetsController.deletarPorId); 

        // Rotas para likes
        router.get("/likes", likesController.listar);         
        router.post("/likes", likesController.criar);        
        router.delete("/likes/:id", likesController.deletarPorId);  

        // Rotas para retweets
        router.get("/retweets", retweetsController.listar);         
        router.post("/retweets", retweetsController.criar);        
        router.delete("/retweets/:id", retweetsController.deletarPorId);  

        // Rotas para seguidores
        router.get("/followers", followersController.listar);         
        router.post("/followers", followersController.seguir);        
        router.delete("/followers/:id", followersController.deletarPorId);  

        return router;
    }
}
