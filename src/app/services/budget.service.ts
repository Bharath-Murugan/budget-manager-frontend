import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Budget } from '../models/Budget';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

private saveUrl = 'http://localhost:8080/budgets';

  constructor(private http:HttpClient) { }

  getAllBudgets(): Observable<any> {
    return this.http.get(this.saveUrl);
  }

  saveBudget(budget: Budget): Observable<any>{
    return this.http.post(this.saveUrl, budget, {
      withCredentials: true
    });


  }
}
