import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Expense } from '../../models/Expense';
import { CategoryService } from '../../services/CategoryService';
import { ExpenseService } from '../../services/expense.service';
import { Budget } from '../../models/Budget';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent {

  private categoryService = inject(CategoryService);
  private expenseService = inject(ExpenseService);


  expenses: any[] = [];
  categories: any[] = [];
  selectedCategory: number | null = null;

  expense: Expense = {
    expenseId: 0,
    userId: 0,
    amount: 0,
    categoryId: 0,
    description: '',
    expenseDate: new Date(),
    createdAt: new Date(),
  };

  ngOnInit(): void {
    this.loadCategories();
    this.loadExpenses();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(response => {
      this.categories = response?.data ?? response;
      console.log("Categories loaded successfully:", this.categories);
    });
  }

  loadExpenses(): void {
    this.expenseService.getAllExpenses().subscribe(response => {
      this.expenses = response?.data ?? response;
      console.log("Expenses loaded successfully:", this.expenses);
    });
  }

  saveExpense(): void {
    this.expense.categoryId = this.selectedCategory ?? 0;
    // ensure numeric and date types are correct before sending
    this.expense.amount = Number(this.expense.amount) || 0;
    // if the bound value is a string (from <input type="date">), convert to Date
    if (this.expense.expenseDate && typeof this.expense.expenseDate === 'string') {
      this.expense.expenseDate = new Date(this.expense.expenseDate);
    }
    // ensure description is a string and trimmed
    this.expense.description = String(this.expense.description ?? '').trim();
    console.log('Saving expense payload:', this.expense);
    console.log('Fields:', {
      amount: this.expense.amount,
      description: this.expense.description,
      expenseDate: this.expense.expenseDate,
      categoryId: this.expense.categoryId
    });
    this.expenseService.saveExpense(this.expense).subscribe(response => {
      console.log("Added expense response:", response);
    });

  }

  reset(): void {
    this.expense.amount=0;
    this.expense.description='';
    this.expense.expenseDate= new Date();
    this.selectedCategory = null;

  }
}
