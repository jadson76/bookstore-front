import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  usuarioLogado: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.usuarioLogado = this.authService.getUsuarioAutenticado();
  }

  logout() {
    this.authService.encerrarSessao();
    this.router.navigate(['/login'])
  }

}
