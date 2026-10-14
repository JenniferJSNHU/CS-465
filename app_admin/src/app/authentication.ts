import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';
  private tokenKey = 'travlr-token';

  // authenticate the administrator and save the jwt
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      credentials
    ).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  // retrieve the stored authentication token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // check whether a token exists and has not expired
  isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) return false;

    try {
      const encodedPayload = token.split('.')[1]
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const payload = JSON.parse(atob(encodedPayload));

      return typeof payload.exp === 'number' &&
        payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  // remove the token when the administrator logs out
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}