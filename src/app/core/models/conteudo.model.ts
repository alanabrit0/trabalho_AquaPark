export interface Conteudo {
  id: string;
  categoria: string;
  titulo: string;
  icone: string;
  cor: "azul" | "dourado" | "verde" | "lilas" | "coral";
  resumo: string;
  descricao: string;
  autor: string;
  formato: string;
  acesso: string;
  preco: number;
  beneficios: string[];
}
