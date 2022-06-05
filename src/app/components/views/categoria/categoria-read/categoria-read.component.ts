import { Categoria } from './../../../models/categoria.model';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit {


  categorias: Categoria[] = []
  displayedColumns: string[] = ['id','nome','descricao','livros','acoes']

  constructor(private service: CategoriaService) { }

  ngOnInit() {
    this.findAll();
  } 

  findAll() {
    this.service.findAll().subscribe(resposta => {
      console.log(resposta)
      this.categorias = resposta;
    })
  }

}
