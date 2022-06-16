import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.url + 'categories/';
  headers: HttpHeaders;
  token: string | null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/json'
    });
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url, { headers: this.headers });
  }

  get(id: number): Observable<Category> {
    return this.http.get<Category>(this.url + id, { headers: this.headers });
  }

  create(category: Category) {
    return this.http.post(this.url, category, { headers: this.headers });
  }

  update(category: Category) {
    return this.http.put(this.url + category.id, category, { headers: this.headers });
  }

  delete(id: number) {
    return this.http.delete(this.url + id, { headers: this.headers });
  }
}
