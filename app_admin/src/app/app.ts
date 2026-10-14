import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Authentication } from './authentication';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // access authentication status throughout the application
  public authentication = inject(Authentication);
  private router = inject(Router);

  // end the administrator session and return to login
  logout(): void {
    this.authentication.logout();
    this.router.navigate(['/login']);
  }
}