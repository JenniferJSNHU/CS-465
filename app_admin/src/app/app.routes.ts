import { Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';
import { Login } from './login/login';
import { authGuard } from './auth.guard';

// define routes for the administration application
export const routes: Routes = [
  // trip listing requires authentication
  {
    path: '',
    component: TripListing,
    canActivate: [authGuard]
  },

  // adding trips requires authentication
  {
    path: 'add-trip',
    component: AddTrip,
    canActivate: [authGuard]
  },

  // editing trips requires authentication
  {
    path: 'edit-trip/:tripCode',
    component: EditTrip,
    canActivate: [authGuard]
  },

  // login remains accessible without authentication
  {
    path: 'login',
    component: Login
  }
];