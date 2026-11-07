import { inject, Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Conteudo } from "../models/conteudo.model";
import { HttpClient } from "@angular/common/http";

type FirebaseConteudo = Omit<Conteudo, "id"> & { id?: unknown };

@Injectable({ providedIn: "root" })
export class ConteudosService {
  private http = inject(HttpClient);
  private apiUrl = "https://travellog-4398c-default-rtdb.firebaseio.com/conteudos";
  private sufix = ".json";

  getAll(): Observable<Conteudo[]> {
    return this.http.get<Record<string, FirebaseConteudo> | null >(this.apiUrl + this.sufix).
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
    .get<FirebaseConteudo | null>(`${this.apiUrl}/${id}${this.sufix}`)
    .pipe(
      map((response) => {
        if (!response) {
          throw new Error(`Conteúdo não encontrado!`);
        }
        const { id: _ignoredId, ...conteudoData } = response;
        return { id, ...conteudoData };
      }),
    );
  }

  create(conteudo: Omit<Conteudo, "id">): Observable<Conteudo> {
    return this.http.post < {name: string}> 
      (this.apiUrl + this.sufix, conteudo).pipe(
        map((response) => ({
          id: response.name,
          ...conteudo,
      })),
    );
  }    

  update(id: string, conteudo: Omit<Conteudo, "id">): Observable<Conteudo> {
    return this.http.put <Omit<Conteudo, "id">> 
      (`${this.apiUrl}/${id}${this.sufix}`, conteudo).pipe(
        map((response) => ({
          id,
          ...conteudo,
      })),
    );
  }   

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}${this.sufix}`);
  }

  private readonly conteudosDemonstracao: Conteudo[] = [
    
  ];

  listar(): Observable<Conteudo[]> {
    // Quando a API estiver disponível, substitua o `of` por:
    // return this.http.get<Conteudo[]>('URL_DA_API/conteudos');
    return of(this.conteudosDemonstracao);
  }

  buscarPorId(id: number): Observable<Conteudo | undefined> {
    // Com a API: return this.http.get<Conteudo>(`URL_DA_API/conteudos/${id}`);
    return of(this.conteudosDemonstracao.find((conteudo) => conteudo.id === id));
  }
}