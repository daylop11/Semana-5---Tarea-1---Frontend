import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiUrl = 'https://localhost:5001/api/peliculas';

  constructor(private http: HttpClient) {}

  getPeliculas() {
    return this.http.get<any[]>(this.apiUrl);
  }

  agregarPelicula(pelicula: any) {
    return this.http.post(this.apiUrl, pelicula);
  }

  actualizarPelicula(id: number, pelicula: any) {
    return this.http.put(`${this.apiUrl}/${id}`, pelicula);
  }

  eliminarPelicula(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}