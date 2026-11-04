import { Routes } from "@angular/router";
export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./features/home/home").then((m) => m.Home),
    title: "Início | Raxadinha",
  },
  {
    path: "sobre",
    loadComponent: () => import("./features/sobre/sobre").then((m) => m.Sobre),
    title: "Sobre | Raxadinha",
  },
  {
    path: "conteudos",
    loadComponent: () =>
      import("./features/conteudos/conteudos").then((m) => m.Conteudos),
    title: "Conteúdos | Raxadinha",
  },
  {
    path: "conteudos/:id",
    loadComponent: () =>
      import("./features/detalhe-conteudo/detalhe-conteudo").then(
        (m) => m.DetalheConteudo,
      ),
    title: "Detalhes do conteúdo | Raxadinha",
  },
  {
    path: "admin",
    loadComponent: () => import("./features/admin/admin").then((m) => m.Admin),
    title: "Admin | Raxadinha",
  },
  {
    path: "admin/novo",
    loadComponent: () =>
      import("./features/manutencao-conteudo/manutencao-conteudo").then(
        (m) => m.ManutencaoConteudo,
      ),
    title: "Novo conteúdo | Raxadinha",
  },
  {
    path: "admin/editar/:id",
    loadComponent: () =>
      import("./features/manutencao-conteudo/manutencao-conteudo").then(
        (m) => m.ManutencaoConteudo,
      ),
    title: "Editar conteúdo | Raxadinha",
  },
  { path: "**", redirectTo: "" },
];
