import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Functions } from 'src/app/models/Functions';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  url: string = environment.url + 'functions';
  token: string | null;
  headers: HttpHeaders;

  public asientos: string[] = [];
  private seleccionados = new BehaviorSubject<string[]>([]);
  public reservaciones: JSON[] = [];
  private reservacioneshechas = new BehaviorSubject<JSON[]>([]);
  reservacioneshechas$ = this.reservacioneshechas.asObservable();
  seleccionados$ = this.seleccionados.asObservable();

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

  getAll(): Observable<Functions[]> {
    return this.http.get<Functions[]>(this.url, { headers: this.headers });
  }

  get(id: number): Observable<Functions> {
    return this.http.get<Functions>(this.url + '/' + id, { headers: this.headers });
  }

  getByMovie(movie_id: number): Observable<Functions[]> {
    return this.http.get<Functions[]>(this.url + '/' + 'movie/' + movie_id, { headers: this.headers });
  }

  create(function_data: JSON): Observable<Functions> {
    return this.http.post<Functions>(this.url, function_data, { headers: this.headers });
  }

  update(function_data: Functions): Observable<Functions> {
    return this.http.put<Functions>(this.url + '/' + function_data.id, function_data, { headers: this.headers });
  }

  delete(id: number): Observable<Functions> {
    return this.http.delete<Functions>(this.url + '/' + id, { headers: this.headers });
  }


  addSeat(seat: string) {
    if (this.asientos.includes(seat)) {
      this.asientos = this.asientos.filter(s => s !== seat);
    }
    else {
      this.asientos = [...this.asientos, seat];
      this.seleccionados.next(this.asientos);
    }
  }

  addReservacion(reservacion: JSON){
    this.reservaciones = [...this.reservaciones, reservacion];
    this.reservacioneshechas.next(this.reservaciones);
  }

  clear() {
    this.asientos = [];
    this.seleccionados.next(this.asientos);
  }

  returnJSONReservation(): JSON {
    if(localStorage.getItem('reservaciones')){
      return JSON.parse(JSON.stringify(localStorage.getItem('reservaciones')));
    }else{
      return JSON.parse(JSON.stringify({}));
    }
  }
}
