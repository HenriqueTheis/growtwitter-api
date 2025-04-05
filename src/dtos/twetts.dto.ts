export interface CadastrarTweetDto {
    conteudo?: string;
    tipo: "TWEET" | "RETWEET";
    userId: number;
  }
  
  export interface ListarTweetsDto {
    tipo?: "TWEET" | "RETWEET";
  }
  
  export type AtualizarTweetDto = Partial<CadastrarTweetDto> & { id: number };
  