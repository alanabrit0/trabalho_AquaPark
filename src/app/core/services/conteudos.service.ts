import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Conteudo } from "../models/conteudo.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

type FireBaseConteudo = Omit<Conteudo, 'id'> & { id?: unknown };

@Injectable({ providedIn: "root" })
export class ConteudosService {
  private http = inject(HttpClient);
  private apiUrl = "https://aquapark-e11eb-default-rtdb.firebaseio.com/conteudos";
  private sufix = ".json";

  getAll(): Observable<Conteudo[]> {
    return this.http.get<Record<string, FireBaseConteudo> | null >(this.apiUrl + this.sufix).
    pipe(
      map((response) => {
        if (!response) {
          return [];
        }
        return Object.entries(response).map(([id, conteudo]) => {
          const {id: _ignoredId, ...conteudoData } = conteudo;
          return { id, ...conteudoData } as Conteudo;
        });
      })
    );
  }

  getById(id: string): Observable<Conteudo> {
    return this.http
.get<FireBaseConteudo>(`${this.apiUrl}/${id}${this.sufix}`)
.pipe(
  map((response) => {
    if(!response) {
      throw new Error("Conteúdo não encontrado.");
    }
    const {id: _ignoredId, ...conteudoData } = response;
    return { id, ...conteudoData } as Conteudo;
  })
)
  }

  delete (id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}${this.sufix}`);
  }

  private readonly conteudosDemonstracao: Conteudo[] = [
    this.criarConteudo(
      1,
      "Tecnologia",
      "Ideias digitais que saem do papel",
      "💡",
      "azul",
      "Marina Código",
      39.9,
      "Aprenda a transformar uma ideia simples em um projeto digital possível.",
      "Um roteiro prático para validar ideias, definir prioridades e construir a primeira versão sem se perder em detalhes.",
    ),
    this.criarConteudo(
      2,
      "Criatividade",
      "Um guia para criar sem travar",
      "✦",
      "dourado",
      "Clara Ideia",
      24.9,
      "Exercícios simples para desbloquear a criatividade e manter boas ideias em movimento.",
      "Descubra técnicas de repertório, associação e experimentação para produzir com mais leveza e consistência.",
    ),
    this.criarConteudo(
      3,
      "Negócios",
      "Do primeiro clique à primeira venda",
      "↗",
      "verde",
      "Paulo Vendas",
      49.9,
      "Organize os primeiros passos para apresentar, divulgar e vender seu conteúdo.",
      "Um guia direto sobre proposta de valor, público, oferta e jornada de compra para novos negócios digitais.",
    ),
    this.criarConteudo(
      4,
      "Produtividade",
      "Organize hoje, agradeça amanhã",
      "✓",
      "lilas",
      "Ana Agenda",
      19.9,
      "Crie uma rotina que organiza suas tarefas sem transformar o dia em uma planilha infinita.",
      "Métodos leves de planejamento, priorização e revisão para usar melhor o tempo e reduzir tarefas acumuladas.",
    ),
    this.criarConteudo(
      5,
      "Conteúdo",
      "Histórias que prendem a atenção",
      "✎",
      "coral",
      "Bia Narrativa",
      34.9,
      "Use boas histórias para tornar qualquer mensagem mais humana e memorável.",
      "Aprenda estruturas narrativas, construção de contexto e técnicas de escrita aplicáveis a diferentes formatos.",
    ),
    this.criarConteudo(
      6,
      "Marketing",
      "Encontre o público certo",
      "◎",
      "azul",
      "Lucas Alcance",
      44.9,
      "Entenda com quem você quer conversar antes de começar a publicar.",
      "Um caminho prático para pesquisar públicos, reconhecer necessidades e construir uma comunicação relevante.",
    ),
    this.criarConteudo(
      7,
      "Design",
      "Visual bonito também comunica",
      "◈",
      "dourado",
      "Nina Forma",
      29.9,
      "Aplique princípios visuais para deixar seus materiais claros, consistentes e agradáveis.",
      "Conheça fundamentos de hierarquia, contraste, tipografia, cor e espaçamento sem depender de fórmulas complicadas.",
    ),
    this.criarConteudo(
      8,
      "Estratégia",
      "Planeje menos, realize melhor",
      "◇",
      "verde",
      "Rafael Plano",
      39.9,
      "Transforme objetivos amplos em ações pequenas que realmente saem do papel.",
      "Defina direção, critérios e ciclos de execução para manter o foco sem criar planejamentos impossíveis de seguir.",
    ),
    this.criarConteudo(
      9,
      "Carreira",
      "Conhecimento que abre caminhos",
      "★",
      "lilas",
      "Carla Futuro",
      27.9,
      "Organize seu desenvolvimento profissional com escolhas mais conscientes.",
      "Um material para mapear habilidades, criar evidências do seu trabalho e planejar os próximos passos da carreira.",
    ),
    this.criarConteudo(
      10,
      "Inspiração",
      "A próxima grande ideia começa aqui",
      "∞",
      "coral",
      "Equipe Raxadinha",
      14.9,
      "Uma coleção de provocações e exercícios para colocar novas possibilidades em movimento.",
      "Explore perguntas, referências e pequenos desafios criativos para enxergar oportunidades onde antes havia rotina.",
    ),
  ];

  private criarConteudo(
    id: number,
    categoria: string,
    titulo: string,
    icone: string,
    cor: Conteudo["cor"],
    autor: string,
    preco: number,
    resumo: string,
    descricao: string,
  ): Conteudo {
    return {
      id,
      categoria,
      titulo,
      icone,
      cor,
      autor,
      preco,
      resumo,
      descricao,
      formato: "E-book digital",
      acesso: "Imediato e ilimitado",
      beneficios: [
        "Acesso totalmente digital",
        "Conteúdo organizado",
        "Disponível a qualquer momento",
        "Experiência simples e direta",
      ],
    };
  }

  listar(): Observable<Conteudo[]> {
    // Quando a API estiver disponível, substitua o `of` por:
    // return this.http.get<Conteudo[]>('URL_DA_API/conteudos');
    return of(this.conteudosDemonstracao);
  }

  buscarPorId(id: number): Observable<Conteudo | undefined> {
    // Com a API: return this.http.get<Conteudo>(`URL_DA_API/conteudos/${id}`);
    return of(
      this.conteudosDemonstracao.find((conteudo) => conteudo.id === id),
    );
  }
}
