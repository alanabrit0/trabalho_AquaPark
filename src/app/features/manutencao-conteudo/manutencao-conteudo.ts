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
    cidade: ['', [Validators.required, Validators.minLength(3)]],
    pais: ['', [Validators.required]],
    dataViagem: ['', [Validators.required]],
    avaliacao: ['', [Validators.required]],
    relato: ['', [Validators.required]],
    meioTransporte: ['', [Validators.required]],
    favorita: [],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.editingId = id;
      this.loadViagem(id);
    }
  }  
  loadViagem(id: string): void {
    this.loadingData = true;
    this.conteudoService.getById(id).subscribe({
      next: (conteudo) => {
        this.form.patchValue({
          titulo: conteudo.cidade,
          descricao: conteudo.pais,
          dataViagem: conteudo.dataViagem,
          avaliacao: conteudo.avaliacao,
          relato: conteudo.relato,
          meioTransporte: conteudo.meioTransporte,
          favorita: conteudo.favorita,
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
        cidade: formValue.cidade,
        pais: formValue.pais,
        dataViagem: formValue.dataViagem,
        avaliacao: formValue.avaliacao,
        relato: formValue.relato,
        meioTransporte: formValue.meioTransporte,
        favorita: formValue.favorita || false,
      };
      if (this.editingId !== null) {}
  }
}