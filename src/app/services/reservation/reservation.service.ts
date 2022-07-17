import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  url: string = environment.url + 'reservations';
  token: string | null;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
  }

  get() {
    return this.http.get(this.url, { headers: this.headers });
  }

  getById(id: number) {
    return this.http.get(this.url + '/' + id, { headers: this.headers });
  }

  create(reservation: any) {
    return this.http.post(this.url, reservation, { headers: this.headers });
  }

  update(reservation: any, id: number) {
    return this.http.put(this.url + '/' + id, reservation, { headers: this.headers });
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id, { headers: this.headers });
  }

  getByUser(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/' + 'user/' + id, { headers: this.headers })
  }
}
