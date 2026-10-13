import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from '../trip';
import { TripData } from '../trip-data';

@Component({
  selector: 'app-add-trip',
  imports: [FormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTrip {
  private tripData = inject(TripData);
  private router = inject(Router);

  // stores the information entered into the form
  trip: Trip = new Trip();

  // tracks submission errors and prevents duplicate requests
  errorMessage = '';
  isSaving = false;

  // submits the new trip to the rest api
  onSubmit(): void {
    if (this.isSaving) return;

    this.isSaving = true;
    this.errorMessage = '';

    this.tripData.addTrip(this.trip).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isSaving = false;
        this.errorMessage = error.error?.message || 'Unable to save trip.';
        console.error('error adding trip:', error);
      }
    });
  }
}