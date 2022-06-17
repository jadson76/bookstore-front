import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  loginError: boolean;
  cadastrando: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(`Usuario: ${this.username}, Pass: ${this.password}`)
    this.router.navigate(["/home"])
  }

  preparaCadastrar(event) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;

  }


}
