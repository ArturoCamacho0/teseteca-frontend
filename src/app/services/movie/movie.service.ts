import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from 'src/app/models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  url: string = environment.url + 'movies/';
  token: string | null = '';
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    // Get token without comas
    this.token = localStorage.getItem('token');

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
  }

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url, { headers: this.headers });
  }

  getById(id: number): Observable<Movie> {
    return this.http.get<Movie>(this.url + id, { headers: this.headers });
  }

  create(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.url, movie, { headers: this.headers });
  }

  update(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(this.url + movie.id, movie, { headers: this.headers });
  }

  delete(id: number): Observable<Movie> {
    return this.http.delete<Movie>(this.url + id, { headers: this.headers });
  }
}
