import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './trip';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  // provides access to angular's http client
  private http = inject(HttpClient);

  // base url for the existing express rest api
  private apiBaseUrl = 'http://localhost:3000/api';

  // retrieves all trips from the database
  public getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBaseUrl}/trips`);
  }

  // sends a new trip to the api for storage in mongodb
  public addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiBaseUrl}/trips`, trip);
  }

  // retrieves a single trip using its unique code
  public getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBaseUrl}/trips/${encodeURIComponent(code)}`);
  }

  // updates an existing trip in mongodb
  public updateTrip(code: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.apiBaseUrl}/trips/${encodeURIComponent(code)}`,
      trip
    );
  }

  // deletes a trip from mongodb using its unique code
  public deleteTrip(code: string): Observable<{ message: string; trip: Trip }> {
    return this.http.delete<{ message: string; trip: Trip }>(
      `${this.apiBaseUrl}/trips/${encodeURIComponent(code)}`
    );
  }

}