import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoryService } from '../../services/CategoryService';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  private categoryService = inject(CategoryService);

  categories: Category[] = [];

  category: Category = {
    categoryId: 0,
    categoryName: '',
    createdAt: new Date()
  };

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(response => {
      this.categories = response.data;
      console.log("Categories loaded successfully:", this.categories);
    });
  }

  saveCategory(): void {
    this.categoryService.addCategory(this.category).subscribe(response => {

      console.log("Added category response:", response);

      

      // Refresh the table
      this.loadCategories();
    });
  }
}