import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';
import { Session } from 'src/app/models/Session';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.url + 'users/';
  private token: string | null;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  login(user: any): Observable<Session> {
    return this.http.post<Session>(this.url + 'login', user, { headers: this.headers });
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'register', user, { headers: this.headers });
  }
}
