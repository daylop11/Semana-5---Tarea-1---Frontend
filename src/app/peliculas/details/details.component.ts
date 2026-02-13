import { Component } from '@angular/core';
import { Pelicula } from '../../core/models/pelicula';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html'
})
export class DetailsComponent {
  pelicula!: Pelicula;
}
