export interface CadastrarUsersDto {
    name: string;
    email: string;
    username: string;
    senha: string;
  }
  
  export interface ListarUsersDto {
    name?: string;
  }
  
  export type AtualizarUsersDto = Partial<CadastrarUsersDto> & { id: number };
  