export interface CadastrarUserDto {
    nome: string;
    username: string;
    email: string;
    senha: string;
  }
  export interface ListarUsersDto {
    nome?: string;
  }

  export type AtualizarUserDto = Partial<CadastrarUserDto> & { id: string };