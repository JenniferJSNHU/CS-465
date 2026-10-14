import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './trip';
import { Authentication } from './authentication';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  private http = inject(HttpClient);
  private authentication = inject(Authentication);

  // base url for the express rest api
  private apiBaseUrl = 'http://localhost:3000/api';

  // attach the jwt to protected api requests
  private getAuthOptions() {
    const token = this.authentication.getToken();

    return {
      headers: new HttpHeaders(
        token ? { Authorization: `Bearer ${token}` } : {}
      )
    };
  }

  // retrieve all trips from mongodb
  public getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBaseUrl}/trips`);
  }

  // add a new trip with authentication
  public addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(
      `${this.apiBaseUrl}/trips`,
      trip,
      this.getAuthOptions()
    );
  }

  // retrieve a single trip by code
  public getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(
      `${this.apiBaseUrl}/trips/${encodeURIComponent(code)}`
    );
  }

  // update an existing trip with authentication
  public updateTrip(code: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.apiBaseUrl}/trips/${encodeURIComponent(code)}`,
      trip,
      this.getAuthOptions()
    );
  }

  // delete a trip with authentication
  public deleteTrip(code: string): Observable<{ message: string; trip: Trip }> {
    return this.http.delete<{ message: string; trip: Trip }>(
      `${this.apiBaseUrl}/trips/${encodeURIComponent(code)}`,
      this.getAuthOptions()
    );
  }
}