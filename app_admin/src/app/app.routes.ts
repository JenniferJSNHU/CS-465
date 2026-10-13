
import { Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';

// defines navigation routes for the admin application
export const routes: Routes = [
  // displays all available trips
  {
    path: '',
    component: TripListing
  },

  // displays the form for creating a new trip
  {
    path: 'add-trip',
    component: AddTrip
  },

  // displays the edit form for a selected trip
  {
    path: 'edit-trip/:tripCode',
    component: EditTrip
  }
];
