import { Component, OnInit, inject } from '@angular/core';
import { Trip } from '../trip';
import { TripCard } from '../trip-card/trip-card';
import { TripData } from '../trip-data';

@Component({
  selector: 'app-trip-listing',
  imports: [TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListing implements OnInit {
  // injects the service used to retrieve trip data
  private tripData = inject(TripData);

  // stores trips returned by the api
  trips: Trip[] = [];

  // retrieves trip data when the component initializes
  ngOnInit(): void {
    this.tripData.getTrips().subscribe({
      next: (data: Trip[]) => {
        this.trips = data;
      },
      error: (error) => {
        console.error('error retrieving trips:', error);
      }
    });
  }

  // deletes the selected trip and updates the listing
  onDeleteTrip(code: string): void {
    this.tripData.deleteTrip(code).subscribe({
      next: (response) => {
        // removes only the deleted record from the displayed trips
        this.trips = this.trips.filter(
          trip => trip._id !== response.trip._id
        );
      },
      error: (error) => {
        console.error('error deleting trip:', error);
        alert('Unable to delete trip. Please try again.');
      }
    });
  }

}