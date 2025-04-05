import express, { request } from "express";
import { envs } from "./envs";
import { UsersRoutes } from "./routes/user.routes";
import { TweetsRoutes } from "./routes/tweets.routes";
import { RetweetsRoutes } from "./routes/retweets.routes";
import { LikesRoutes } from "./routes/likes.routes";
import { FollowersRoutes } from "./routes/followers.routes";

const app = express();
app.use(express.json());

app.get('/', (req, res, next) => {
    res.status(200).json({
        sucesso: true,
        message: "Api is Runingg"
    })
})

app.use(UsersRoutes.bind());
app.use(RetweetsRoutes.bind());
app.use(LikesRoutes.bind());
app.use(FollowersRoutes.bind());

app.listen(envs.PORT, () => console.log("Servidor rodando"))