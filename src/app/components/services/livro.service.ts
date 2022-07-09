import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livro } from '../models/livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: String = environment.baseUrl

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAllByCatgoria(id_cat: String): Observable<Livro[]> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`
    const headers = this.obterToken();
    return this.http.get<Livro[]>(url, { headers })
  }

  findById(id: String): Observable<Livro> {
    const url = `${this.baseUrl}/livros/${id}`
    const headers = this.obterToken();
    return this.http.get<Livro>(url, { headers })
  }

  create(livro: Livro, id_cat: String): Observable<Livro> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`
    const headers = this.obterToken();
    return this.http.post<Livro>(url,livro, { headers })
  }

  update(livro: Livro) : Observable<Livro> {
    const url = `${this.baseUrl}/livros/${livro.id}`
    const headers = this.obterToken();
    return this.http.put<Livro>(url,livro, { headers })
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`,'OK',{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }

  obterToken() {
    const tokenString = localStorage.getItem('access_token')
    const token = JSON.parse(tokenString)
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }
    return headers;
  }
}