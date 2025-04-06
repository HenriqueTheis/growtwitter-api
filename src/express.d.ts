
declare namespace Express{
    interface Request{
        userLogado:{
            name: string;
            id: number;
            email: string;
        }
    }
}