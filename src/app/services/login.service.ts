import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://localhost:8080/users/login';

  constructor(private http: HttpClient) {}
   login(loginRequest : any){
      return this.http.post(this.url,loginRequest, {
        withCredentials: true
      });
    }
}
