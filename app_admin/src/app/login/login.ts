import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from '../authentication';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authentication = inject(Authentication);
  private router = inject(Router);

  // stores administrator login credentials
  credentials = {
    email: '',
    password: ''
  };

  // tracks login errors and submission status
  errorMessage = '';
  isSubmitting = false;

  // validates and submits administrator credentials
  onSubmit(): void {
    if (this.isSubmitting) return;

    this.errorMessage = '';

    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Email and password are required.';
      return;
    }

    this.isSubmitting = true;

    // authenticate through the express api
    this.authentication.login(this.credentials).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.status === 401
          ? 'Invalid email or password.'
          : 'Unable to log in. Please try again.';
        console.error('login failed:', error);
      }
    });
  }
}