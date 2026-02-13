import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pelicula {
  id: number;
  titulo: string;
  director: string;
  anio: number;
  genero: string;
  calificacion: number;
}

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

private apiUrl = 'https://localhost:7046/api/Peliculas';

  constructor(private http: HttpClient) {}

  getPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  crearPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, pelicula);
  }

  actualizarPelicula(id: number, pelicula: Pelicula) {
    return this.http.put(`${this.apiUrl}/${id}`, pelicula);
  }

  eliminarPelicula(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
