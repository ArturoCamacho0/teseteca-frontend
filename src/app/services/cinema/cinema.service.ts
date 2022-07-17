import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cinema } from './../../models/Cinema';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  url: string = environment.url + 'cinemas';
  token: string | null;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
  }

  getAll(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(this.url, { headers: this.headers });
  }

  get(id: number): Observable<Cinema> {
    return this.http.get<Cinema>(this.url + '/' + id, { headers: this.headers });
  }

  create(cinema: Cinema): Observable<any> {
    return this.http.post(this.url, cinema, { headers: this.headers });
  }
}
