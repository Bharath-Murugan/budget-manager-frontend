import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/Expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

private saveExpenseUrl = 'http://localhost:8080/expenses';


  constructor(private http: HttpClient) { }

  getAllExpenses(): Observable<any> {
    return this.http.get(this.saveExpenseUrl);
  }

  saveExpense(expense: Expense): Observable<any>{
    return this.http.post(this.saveExpenseUrl, expense, {
      withCredentials: true
    });
  }
}
