import { CategoriaCreateComponent } from './components/views/categoria/categoria-create/categoria-create.component';
import { HomeComponent } from './components/views/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaReadComponent } from './components/views/categoria/categoria-read/categoria-read.component';
import { CategoriaDeleteComponent } from './components/views/categoria/categoria-delete/categoria-delete.component';
import { CategoriaUpdateComponent } from './components/views/categoria/categoria-update/categoria-update.component';
import { LivroReadAllComponent } from './components/views/livro/livro-read-all/livro-read-all.component';
import { LivroCreateComponent } from './components/views/livro/livro-create/livro-create.component';
import { LivroUpdateComponent } from './components/views/livro/livro-update/livro-update.component';
import { LoginComponent } from './components/views/login/login/login.component';
import { LayoutComponent } from './components/template/layout/layout.component';
import { AuthGuard } from './components/guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },   
  
  {
    path: '',
    component: LayoutComponent, children: [
      {
        path: 'home',
        component: HomeComponent, canActivate : [AuthGuard]
      },
      {
        path: 'categorias',
        component: CategoriaReadComponent, canActivate : [AuthGuard]
      },
      {
        path: 'categorias/create',
        component: CategoriaCreateComponent, canActivate : [AuthGuard]
      },
      {
        path: 'categorias/delete/:id',
        component: CategoriaDeleteComponent, canActivate : [AuthGuard]
      },
      {
        path: 'categorias/update/:id',
        component: CategoriaUpdateComponent, canActivate : [AuthGuard]
      },
      {
        path: 'categorias/:id_cat/livros',
        component: LivroReadAllComponent, canActivate : [AuthGuard]
      },
      {
        path: 'categorias/:id_cat/livros/create',
        component: LivroCreateComponent, canActivate : [AuthGuard]
      },
      {
        path: 'categorias/:id_cat/livros/:id/update',
        component: LivroUpdateComponent, canActivate : [AuthGuard]
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
