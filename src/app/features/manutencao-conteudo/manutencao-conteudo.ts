import { Component, inject } from "@angular/core";
import { RouterLink, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Conteudo } from "../../core/models/conteudo.model";
import { Validators } from "@angular/forms";
import { ConteudosService } from "../../core/services/conteudos.service";

@Component({
  selector: "app-manutencao-conteudo",
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: "./manutencao-conteudo.html",
  styleUrl: "./manutencao-conteudo.css",
})
export class ManutencaoConteudo {
  private fb = inject(FormBuilder);
  private conteudoService = inject(ConteudosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  editingId: string | null = null;
  loading = false;
  loadingData = false;
  sucessMessage = "";
  errorMessage = "";

  form = this.fb.nonNullable.group({
    id: ["", [Validators.required]],
    nome: ["", [Validators.required, Validators.minLength(3)]],
    capacidade: ["", [Validators.required]],
    alturaMinima: ["", [Validators.required]],
    localizacao: ["", [Validators.required]],
    ultimaInspecao: ["", [Validators.required]],
    descricao: ["", [Validators.required]],
    emFuncionamento: [true, [Validators.required]],
    responsavel: ["", [Validators.required]],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.editingId = id;
      this.loadConteudo(id);
    }
  }  
  loadConteudo(id: string): void {
    this.loadingData = true;
    this.conteudoService.getById(id).subscribe({
      next: (conteudo) => {
        this.form.patchValue({
          id: conteudo.id,
          nome: conteudo.nome,
          capacidade: conteudo.capacidade,
          alturaMinima: conteudo.alturaMinima,
          localizacao: conteudo.localizacao,
          ultimaInspecao: conteudo.ultimaInspecao,
          descricao: conteudo.descricao,
          emFuncionamento: conteudo.emFuncionamento,
          responsavel: conteudo.responsavel,
        });
        this.loadingData = false;
      },
      error: (error) => {
        this.errorMessage = "Erro ao carregar conteudo: " + error.message;
        this.loadingData = false;
      },
    });
  }    

  submit(): void {
  this.sucessMessage = "";
  this.errorMessage = "";

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.loading = true;
  const formValue = this.form.getRawValue();
  const conteudoData = {
    id: formValue.id,
    nome: formValue.nome,
    capacidade:(formValue.capacidade),
    alturaMinima: (formValue.alturaMinima),
    localizacao: formValue.localizacao,
    ultimaInspecao: formValue.ultimaInspecao,
    descricao: formValue.descricao,
    emFuncionamento: formValue.emFuncionamento,
    responsavel: formValue.responsavel,
  };

  if (this.editingId !== null) {
    this.conteudoService.update(this.editingId, conteudoData).subscribe({
      next: () => {
        this.loading = false;
        this.sucessMessage = "Conteúdo atualizado com sucesso!";
        setTimeout(() => this.router.navigate(["/admin"]), 1000);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = "Erro ao atualizar conteúdo!";
      },
    });
    return;
  }

  this.conteudoService.create(conteudoData).subscribe({
    next: () => {
      this.loading = false;
      this.sucessMessage = "Conteúdo criado com sucesso!";
      this.form.reset();
      setTimeout(() => this.router.navigate(["/admin"]), 1000);
    },
    error: () => {
      this.loading = false;
      this.errorMessage = "Erro ao criar conteúdo!"; 
    },
  });
  }
}  