import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { PeliculasService } from '../core/services/peliculas.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: radial-gradient(circle at top left, #0f2027, #0a192f, #081120);
      font-family: 'Segoe UI', sans-serif;
      color: white;
      padding: 40px;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .navbar h1 {
      color: #39bdf8;
      margin: 0;
    }

    .logout-btn {
      background: linear-gradient(90deg, #ff4b2b, #ff416c);
      border: none;
      padding: 8px 15px;
      border-radius: 8px;
      color: white;
      cursor: pointer;
      font-size: 13px;
    }

    .card {
      background: #162238;
      padding: 25px;
      border-radius: 15px;
      margin-bottom: 25px;
      box-shadow: 0 0 20px rgba(0,183,255,0.2);
    }

    input {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 8px;
      border: none;
      background: #2a3a52;
      color: white;
    }

    button.primary {
      background: linear-gradient(90deg, #1ea7fd, #39bdf8);
      border: none;
      padding: 10px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      width: 100%;
      margin-top: 5px;
    }

    .movie-list {
      display: grid;
      gap: 15px;
    }

    .movie-item {
      background: #1b2b45;
      padding: 15px;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .actions button {
      margin-left: 5px;
      border: none;
      padding: 5px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
    }

    .edit-btn {
      background: #f7b731;
      color: black;
    }

    .delete-btn {
      background: #ff6b6b;
      color: white;
    }
  `]
})
export class HomeComponent implements OnInit {

  peliculas: any[] = [];

  peliculaActual: any = {
    id: 0,
    titulo: '',
    director: '',
    anio: 0
  };

  modoEdicion = false;

  constructor(
    private auth: AuthService,
    private peliculasService: PeliculasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarPeliculas();
  }

  cargarPeliculas() {
    this.peliculasService.getPeliculas()
      .subscribe(data => this.peliculas = data);
  }

  guardar() {
    if (this.modoEdicion) {
      this.peliculasService
        .actualizarPelicula(this.peliculaActual.id, this.peliculaActual)
        .subscribe(() => {
          this.cargarPeliculas();
          this.resetFormulario();
        });
    } else {
      this.peliculasService
        .agregarPelicula(this.peliculaActual)
        .subscribe(() => {
          this.cargarPeliculas();
          this.resetFormulario();
        });
    }
  }

  editar(pelicula: any) {
    this.peliculaActual = { ...pelicula };
    this.modoEdicion = true;
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar esta película?')) {
      this.peliculasService
        .eliminarPelicula(id)
        .subscribe(() => this.cargarPeliculas());
    }
  }

  resetFormulario() {
    this.peliculaActual = {
      id: 0,
      titulo: '',
      director: '',
      anio: 0
    };
    this.modoEdicion = false;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
