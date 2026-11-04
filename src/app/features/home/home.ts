import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { map } from "rxjs";
import { ConteudosService } from "../../core/services/conteudos.service";

@Component({
  selector: "app-home",
  imports: [RouterLink, AsyncPipe],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {
  readonly conteudosDestaque$;

  constructor(conteudosService: ConteudosService) {
    this.conteudosDestaque$ = conteudosService
      .listar()
      .pipe(map((conteudos) => conteudos.slice(0, 10)));
  }

  moverCarrossel(trilho: HTMLElement, direcao: number): void {
    trilho.scrollBy({ left: direcao * 340, behavior: "smooth" });
  }
}
