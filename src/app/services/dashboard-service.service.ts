import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from '../models/Dashboard';


@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  private dashboardUrl = 'http://localhost:8080/Dashboard';

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<Dashboard> {
    return this.http.get<Dashboard>(this.dashboardUrl, {
      withCredentials: true
    });
  }
}
