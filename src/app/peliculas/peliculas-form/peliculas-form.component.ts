import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Pelicula } from '../../core/models/pelicula';

@Component({
  selector: 'app-peliculas-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './peliculas-form.component.html'
})
export class PeliculasFormComponent implements OnChanges {
  // 🔑 Input y Output correctamente declarados
  @Input() pelicula!: Pelicula;
  @Output() submitForm = new EventEmitter<Pelicula>();

  // 🔑 FormGroup usando 'anio' en lugar de 'año'
  form: FormGroup = new FormGroup({
    titulo: new FormControl('', Validators.required),
    director: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
    anio: new FormControl('', [
      Validators.required,
      Validators.min(1900),
      Validators.max(2100)
    ]),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pelicula'] && this.pelicula) {
      this.form.patchValue(this.pelicula);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value as Pelicula);
    }
  }
}
