import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErroAPI } from 'src/app/components/models/error.model';
import { AuthService } from 'src/app/components/services/auth.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = {
    username: '',
    password: '',
    nome: ''
  }
   
  cadastrando: boolean;
  errors: ErroAPI[] = [];

  usernameInvalid: boolean ;
  passwordInvalid: boolean ;
  nomeInvalid: boolean ;
  usernameErrorMessage: String = '';
  passwordErrorMessage: String = '';
  nomeErrorMessage: String = '';

  constructor(
    private router: Router,
    private authService: AuthService)
  { }

  ngOnInit() {   
  }

  onSubmit() { 
    let username = this.usuario.username;
    let password = this.usuario.password;
    this.authService
      .tentarLogar(username,password)
      .subscribe(response => { 
        const access_token = JSON.stringify(response);
        localStorage.setItem('access_token', access_token)    
        this.router.navigate(["/home"])
      }, errorResponse => {      
        this.authService.mensagem('Usuario e/ou senha incorreto(s).'); 
      })   
    
  }

  preparaCadastrar(event) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;
  }

  cadastrar() {   
    this.authService.salvar(this.usuario).subscribe( resposta => {
      this.authService.mensagem('Usuario cadastrado com sucesso!')
      this.cadastrando = false;      
    }, err => {                 
      let mensagem = err.error.error;
      this.errors = err.error.errors;
      this.setMessage();      
      this.authService.mensagem('Erro ao cadastrar novo Usuario: '+mensagem);      
    })
  }

  setMessage() {
    this.errors.forEach(function(erro){
    let campo = erro.fieldName;    
      if(campo=='nome') {
        this.nomeInvalid =true;
        this.nomeErrorMessage = erro.message;        
      }
      if(campo=='username') {
        this.usernameInvalid = true;
        this.usernameErrorMessage = erro.message;        
      }
      if(campo=='password') {
        this.passwordInvalid = true;
        this.passwordErrorMessage = erro.message;       
      }
    })    
  }

  getMessage() {
    if(this.nomeInvalid) {
      return this.nomeErrorMessage;
    }
    if(this.usernameInvalid) {
      return this.usernameErrorMessage;
    }
    if(this.passwordInvalid) {
      return this.passwordErrorMessage;
    }
    return false;
  }

 



}
