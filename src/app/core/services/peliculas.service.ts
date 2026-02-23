import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiUrl = 'https://localhost:57187/api/peliculas';

  constructor(private http: HttpClient) {}

  getPeliculas() {
    return this.http.get<any[]>(this.apiUrl, {
      headers: {
        Authorization: "Bearer token_simple_123"
      }
    });
  }

  agregarPelicula(pelicula: any) {
    return this.http.post(this.apiUrl,       pelicula, {
      headers: {
        Authorization: "Bearer token_simple_123"
      }

    });
  }

  actualizarPelicula(id: number, pelicula: any) {
    return this.http.put(`${this.apiUrl}/${id}`,  pelicula,{
      headers: {
        Authorization: "Bearer token_simple_123"
      }
      
    });
  }

  eliminarPelicula(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: "Bearer token_simple_123"
      }});
  }
}