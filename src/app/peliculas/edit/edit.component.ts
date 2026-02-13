import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasFormComponent } from '../peliculas-form/peliculas-form.component';
import { Pelicula } from '../../core/models/pelicula';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, PeliculasFormComponent],
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  pelicula!: Pelicula;

  ngOnInit() {
    this.pelicula = { 
      id: 1, 
      titulo: 'Matrix', 
      director: 'Wachowski', 
      genero: 'Sci-Fi', 
      anio: 1999  // 🔑 
    };
  }

  actualizarPelicula(p: Pelicula) {
    console.log('Actualizar película:', p);

    // Aquí podrías llamar a tu servicio para actualizarla:
    // this.peliculasService.actualizarPelicula(p).subscribe(...)
  }
}
