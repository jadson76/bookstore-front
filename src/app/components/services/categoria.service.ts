import { environment } from './../../../environments/environment';
import { Categoria } from './../models/categoria.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl: String = environment.baseUrl;
  

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAll():Observable<Categoria[]> {
    const url = `${this.baseUrl}/categorias`
    const headers = this.obterToken();
     return this.http.get<Categoria[]>(url,{ headers }) 
  }

  findById(id: String) : Observable<Categoria> {
    const url = `${this.baseUrl}/categorias/${id}`
    const headers = this.obterToken();
    return this.http.get<Categoria>(url,{ headers });
  }

  create(categoria: Categoria): Observable<Categoria> {
    const url = `${this.baseUrl}/categorias`
    const headers = this.obterToken();
    return this.http.post<Categoria>(url,categoria, { headers });
  }

  delete(id: String):Observable<void> {
    const url = `${this.baseUrl}/categorias/${id}`
    const headers = this.obterToken();
    return this.http.delete<void>(url, { headers }) 
  } 
  
  update(categoria: Categoria): Observable<void> {
    const url = `${this.baseUrl}/categorias/${categoria.id}`
    const headers = this.obterToken();
    return this.http.put<void>(url,categoria, { headers })
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
