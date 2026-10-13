
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../trip';
import { TripData } from '../trip-data';

@Component({
  selector: 'app-edit-trip',
  imports: [FormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {
  private tripData = inject(TripData);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // stores the selected trip and its original code
  trip: Trip = new Trip();
  tripCode = '';

  // tracks loading, saving, and api errors
  errorMessage = '';
  isLoading = true;
  isSaving = false;

  // retrieves the selected trip when the component loads
  ngOnInit(): void {
    this.tripCode = this.route.snapshot.paramMap.get('tripCode') || '';

    if (!this.tripCode) {
      this.errorMessage = 'Trip code not found.';
      this.isLoading = false;
      return;
    }

    this.tripData.getTrip(this.tripCode).subscribe({
      next: (data: Trip) => {
        this.trip = data;

        // formats the date for the html date input
        this.trip.start = data.start.slice(0, 10);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Unable to load trip.';
        console.error('error retrieving trip:', error);
      }
    });
  }

  // submits changes to the rest api
  onSubmit(): void {
    if (this.isSaving || this.isLoading || !this.tripCode) return;

    this.isSaving = true;
    this.errorMessage = '';

    this.tripData.updateTrip(this.tripCode, this.trip).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isSaving = false;
        this.errorMessage = error.error?.message || 'Unable to update trip.';
        console.error('error updating trip:', error);
      }
    });
  }
}
