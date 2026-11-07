import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { Conteudo } from "../../core/models/conteudo.model";
import { ConteudosService } from "../../core/services/conteudos.service";


@Component({
  selector: "app-admin",
  imports: [RouterLink],
  templateUrl: "./admin.html",
  styleUrl: "./admin.css",
})
export class Admin {
  private conteudoService = inject(ConteudosService);
  private router = inject(Router);

conteudos: Conteudo[] = [];
  loading = false;
  errorMessage = "";
  sucessMessage = "";

  ngInit(): void {
    this.loadConteudos();
  }

  loadConteudos(): void {
    this.loading = true;
    this.errorMessage = "";
this.conteudoService.getAll().subscribe({
      next: (response) => {
        this.conteudos = response;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = "Erro ao carregar conteudos: " + error.message;
        this.loading = false;
      },
    });
  }
  
  edit(id: string): void {
    this.router.navigate(["/admin/editar"],{
      queryParams: { id },
    });
  }

  remove(id: string): void {
    const confirmDelete = confirm("Tem certeza que deseja remover este conteúdo?");
    if (confirmDelete) {
      return;
    }
    this.conteudoService.delete(id).subscribe({
      next: () => {
        this.sucessMessage = "Conteúdo removido com sucesso!";
        this.loadConteudos();
      setTimeout(() => {
        this.sucessMessage = "";
      }, 2000);
    },
    error: () => {
      this.errorMessage = "Erro ao remover conteudo!";
    },
    });
  }    
}