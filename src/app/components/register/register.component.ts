import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterService } from '../../services/register.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  title = 'Create your account';
  userName = '';
  email = '';
  password = '';
  confirmPassword = '';
  role = '';
  errorMsg = '';
  isSubmitting = false;

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  register(): void {
    if (this.isSubmitting) {
      return;
    }

    if (
      !this.userName ||
      !this.email ||
      !this.password ||
      !this.confirmPassword ||
      !this.role
    ) {
      this.errorMsg = 'Please complete all fields';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMsg = 'Please enter a valid email address';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Passwords do not match';
      return;
    }

    const registerRequest = {
      userName: this.userName,
      email: this.email,
      password: this.password,
      createdAt: new Date(),
      role: this.role
    };

    this.errorMsg = '';
    this.isSubmitting = true;

    this.registerService.registerUser(registerRequest).subscribe({
      next: response => {
      this.isSubmitting = false;
      if (response.status === 200) {
        this.router.navigate(['/'], {
          queryParams: { registered: 'success' }
        });
      } else {
        this.errorMsg = 'Unable to create account';
      }
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting = false;
        if (error.status === 400) {
          this.errorMsg = 'An account with this user ID, username, or email already exists.';
        } else if (error.status === 0) {
          this.errorMsg = 'Unable to connect to the server. Please try again.';
        } else {
          this.errorMsg = 'Unable to create account. Please try again.';
        }
      }
    });
  }

  clearDuplicateError(): void {
    if (this.errorMsg === 'An account with this user ID, username, or email already exists.') {
      this.errorMsg = '';
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
