export interface Conteudo {
  id: string;
  descricao: string;
  nome: string;
  capacidade?: string;
  alturaMinima?: string;
  localizacao: string;
  ultimaInspecao: string;
  emFuncionamento: boolean;
  responsavel?: string;
  icone?: string;
  cor?: string;
}
