import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasService } from '../../core/services/peliculas.service';
import { Pelicula } from '../../core/models/pelicula';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  peliculas:any = [];

  constructor(private peliculasService: PeliculasService) {

  }

  ngOnInit(): void {
    this.peliculas = this.peliculasService.getPeliculas()
  }

  eliminar(id:number) {
    this.peliculasService.eliminarPelicula(id)
  }

}

