import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/Observable'
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl + "/usuarios";
  tokenUrl: string = environment.baseUrl + environment.obterTokenUrl;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clienteSecret;
  grantType: string = environment.grantType;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient,private _snack: MatSnackBar) { }

  obterToken() {
    const tokenString = localStorage.getItem('acess_token')
    if(tokenString){
      const token = JSON.parse(tokenString).acess_token
      return token;
    }
    return null;
  }

  isAuthenticated() : boolean {
    const token = this.obterToken();
    if(token) {
      const expirated = this.jwtHelper.isTokenExpired(token)
      return !expirated;
    }
    return false;
  }

  salvar(usuario: Usuario) : Observable<any> {
    return this.http.post<any>(this.baseUrl,usuario);
  }

  tentarLogar(username: string, password: string) : Observable<any> {
    const params = new HttpParams()
                      .set('username',username)
                      .set('password',password)
                      .set('grant_type','password')
    const headers = {
      'Authorization' : 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`) ,
      'Content-Type' : 'application/x-www-form-urlencoded'
    }                  
    return this.http.post(this.tokenUrl, params.toString(), {headers});
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`,'OK',{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
