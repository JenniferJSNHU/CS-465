
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Trip } from '../trip';

@Component({
  selector: 'app-trip-card',
  imports: [RouterLink],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard {
  // receives an individual trip from the parent component
  @Input() trip!: Trip;

  // notifies the parent component when deletion is confirmed
  @Output() deleteRequested = new EventEmitter<string>();

  // confirms deletion before sending the request
  confirmDelete(): void {
    if (window.confirm(`Delete ${this.trip.name}? This cannot be undone.`)) {
      this.deleteRequested.emit(this.trip.code);
    }
  }
}
