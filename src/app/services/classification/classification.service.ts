import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Classification } from 'src/app/models/Classification';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {
  url: string = environment.url + 'classifications';
  token: string | null;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/json'
    });
  }

  getAll(): Observable<Classification[]> {
    return this.http.get<Classification[]>(this.url, { headers: this.headers });
  }

  get(id: number): Observable<Classification> {
    return this.http.get<Classification>(this.url + '/' + id, { headers: this.headers });
  }

  create(classification: Classification): Observable<Classification> {
    return this.http.post<Classification>(this.url, classification, { headers: this.headers });
  }

  update(classification: Classification): Observable<Classification> {
    return this.http.put<Classification>(this.url + '/' + classification.id, classification, { headers: this.headers });
  }

  delete(id: number): Observable<Classification> {
    return this.http.delete<Classification>(this.url + '/' + id, { headers: this.headers });
  }
}
