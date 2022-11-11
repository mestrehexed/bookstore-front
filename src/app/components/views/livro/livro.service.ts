import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { Categoria } from "../categoria/categoria.model";
import { Livro } from "./livro.model";

@Injectable({
  providedIn: "root",
})
export class LivroService {
  
  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private _snack:MatSnackBar) {}

  findAllByCategoria(id_cat: String): Observable<Livro[]> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`;
    return this.http.get<Livro[]>(url);
  }

  findByiDlivro(id: String): Observable<Livro> {
    const url = `${this.baseUrl}/livros/${id}`;
    return this.http.get<Livro>(url);
  }

  delete(id: String): Observable<void> {
    const url = `${this.baseUrl}/livros/${id}`;
    return this.http.delete<void>(url);
  } 
  create(livro:Livro, id_cat : String): Observable<Livro>{
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`;
    return this.http.post<Livro>(url,livro)
  
  
  }

  update(livro:Livro): Observable<void>{
  const url = `${this.baseUrl}/livros/${livro.id}`;
  return this.http.put<void>(url,livro);

  }

mensagem(str:string ): void{

this._snack.open(`${str}`,'ok', {
  horizontalPosition:'end',
  verticalPosition:'top',
   duration:3000
})

}

}
