import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map, switchMap } from "rxjs";
import { ConteudosService } from "../../core/services/conteudos.service";

@Component({
  selector: "app-detalhe-conteudo",
  imports: [AsyncPipe, CurrencyPipe, RouterLink],
  templateUrl: "./detalhe-conteudo.html",
  styleUrl: "./detalhe-conteudo.css",
})
export class DetalheConteudo {
  readonly conteudo$;

  constructor(route: ActivatedRoute, conteudosService: ConteudosService) {
    this.conteudo$ = route.paramMap.pipe(
      map((parametros) => Number(parametros.get("id"))),
      switchMap((id) => conteudosService.buscarPorId(id)),
    );
  }
}
