import express, { request } from "express";
import { envs } from "./envs";

const app = express();
app.use(express.json());

app.get('/', (req, res, next) => {
    res.status(200).json({
        sucesso: true,
        message: "Api is Runingg"
    })
})



app.listen(envs.PORT, () => console.log("Servidor rodando"))