import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasFormComponent } from '../peliculas-form/peliculas-form.component'; 
import { Pelicula } from '../../core/models/pelicula';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, PeliculasFormComponent],
  templateUrl: './add.component.html'
})
export class AddComponent {
  // 🔑 Tipo correcto de Pelicula
  pelicula: Pelicula = { titulo: '', director: '', genero: '', anio: 0 }; 

  crearPelicula(p: Pelicula) {
    console.log('Creando:', p);

  }
}
