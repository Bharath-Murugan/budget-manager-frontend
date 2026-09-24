import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  private registerUrl = 'http://localhost:8080/users';
  constructor(private http: HttpClient) { }

  registerUser(userData: object): Observable<HttpResponse<unknown>> {
    return this.http.post(this.registerUrl, userData, {
      withCredentials: true,
      observe: 'response'
    });
  }
}
