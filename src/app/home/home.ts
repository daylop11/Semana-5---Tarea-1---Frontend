import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeliculasService, Pelicula } from '../services/peliculas';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  peliculas: Pelicula[] = [];
  modoEdicion = false;

  peliculaActual: Pelicula = {
    id: 0,
    titulo: '',
    director: '',
    anio: 0,
    genero: '',
    calificacion: 0
  };

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas() {
    this.peliculasService.getPeliculas()
      .subscribe({
        next: (data) => this.peliculas = data,
        error: (err) => console.error('Error al cargar películas', err)
      });
  }

  guardar() {
    if (this.modoEdicion) {
      this.peliculasService.actualizarPelicula(this.peliculaActual.id, this.peliculaActual)
        .subscribe({
          next: () => {
            this.cargarPeliculas();
            this.reset();
          },
          error: (err) => console.error('Error al actualizar', err)
        });
    } else {
      this.peliculasService.crearPelicula(this.peliculaActual)
        .subscribe({
          next: () => {
            this.cargarPeliculas();
            this.reset();
          },
          error: (err) => console.error('Error al crear', err)
        });
    }
  }

  editar(p: Pelicula) {
    this.peliculaActual = { ...p };
    this.modoEdicion = true;
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que quieres eliminar esta película?')) {
      this.peliculasService.eliminarPelicula(id)
        .subscribe({
          next: () => this.cargarPeliculas(),
          error: (err) => console.error('Error al eliminar', err)
        });
    }
  }

  reset() {
    this.peliculaActual = {
      id: 0,
      titulo: '',
      director: '',
      anio: 0,
      genero: '',
      calificacion: 0
    };
    this.modoEdicion = false;
  }
}
