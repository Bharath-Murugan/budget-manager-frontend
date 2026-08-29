import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

private apiUrl = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addCategory(category: Category): Observable<any>{
    return this.http.post(this.apiUrl, category);
  }
}
