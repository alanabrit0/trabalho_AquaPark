import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { Conteudo } from "../../core/models/conteudo.model";
import { ConteudosService } from "../../core/services/conteudos.service";
import { signal } from "@angular/core";


@Component({
  selector: "app-admin",
  imports: [RouterLink],
  templateUrl: "./admin.html",
  styleUrl: "./admin.css",
})
export class Admin {
  private conteudoService = inject(ConteudosService);
  private router = inject(Router);

conteudos = signal<Conteudo[]>([]);
  loading = signal(true);
  errorMessage = "";
  sucessMessage = "";

  ngOnInit(): void {
    this.loadConteudos();
  }

  loadConteudos(): void {
    this.loading.set(true);
    this.errorMessage = "";
this.conteudoService.getAll().subscribe({
      next: (response) => {
        this.conteudos.set(response);
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage = "Erro ao carregar conteudos: " + error.message;
        this.loading.set(false);
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