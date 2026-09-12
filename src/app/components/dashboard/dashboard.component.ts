import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Dashboard } from '../../models/Dashboard';
import { DashboardServiceService } from '../../services/dashboard-service.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  private dashboardService = inject(DashboardServiceService);

  constructor(private router: Router) {}
  logout(){
    sessionStorage.removeItem("loggedIn");
    this.router.navigate(['/']);

  }


  dashboard: Dashboard = {
    totalBudget: 0,
    totalExpense: 0,
    remainingBudget: 0,
    currentMonthExpense: 0
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.dashboardService.getDashboardData().subscribe((response: any) =>{
      this.dashboard = response?.data ?? response;
      console.log("Dashboard data loaded successfully:", this.dashboard);

    });
  }

}
