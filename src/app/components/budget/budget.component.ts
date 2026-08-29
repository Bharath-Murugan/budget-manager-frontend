import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/Category';
import { Budget } from '../../models/Budget';
import { BudgetService } from '../../services/budget.service';
import { CategoryService } from '../../services/CategoryService';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent {

  private budgetService = inject(BudgetService);
  private categoryService = inject(CategoryService);

selectedCategory: number | null = null;
categories: Category[] = [];
budgets: Budget[] =[];

budget: Budget = {
  categoryId: 0,
  amount: 0,
  startDate: new Date(),
  endDate: new Date(),
  createdAt: new Date(),
}

ngOnInit(): void {
  this.loadBudgets();
  this.loadCategories();

}

loadBudgets(): void {
  this.budgetService.getAllBudgets().subscribe(response => {
    this.budgets = response.data;
    console.log("Budgets loaded successfully:", this.budgets);
  })
}

loadCategories(): void {
  this.categoryService.getAllCategories().subscribe(response => {
    this.categories = response?.data ?? response;
    console.log("Categories loaded successfully:", this.categories);
  })
}

saveBudget(): void{
  this.budget.categoryId = this.selectedCategory ?? 0;
  this.budgetService.saveBudget(this.budget).subscribe(response => {
    console.log("Added budget response:", response);
  })
}

resetBudget(): void{
  this.selectedCategory = null;
  this.budget.amount = 0;
  this.budget.startDate = new Date();
  this.budget.endDate = new Date();
}


}
