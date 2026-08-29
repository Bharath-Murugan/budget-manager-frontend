import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';
import { BudgetComponent } from './components/budget/budget.component';
import { ExpenseComponent } from './components/expense/expense.component';
export const routes: Routes = [

    {
        path: '',
        component: LoginComponent
    },

    {
        path: 'dashboard',
        component: DashboardComponent,
        //canActivate: [authGuard]
    },

    {
        path: 'category',
        component: CategoryComponent,
    },

    {
        path:'budgets',
        component: BudgetComponent,
    },
    {
        path:'expense',
        component: ExpenseComponent,
    }

];
