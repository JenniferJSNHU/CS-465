
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { TripListing } from './trip-listing';
import { TripData } from '../trip-data';
import { Trip } from '../trip';

describe('TripListing', () => {
  let component: TripListing;
  let fixture: ComponentFixture<TripListing>;

  // provides mock trip data without accessing mongodb
  const mockTrips: Trip[] = [
    {
      code: 'TEST001',
      name: 'Mock Test Trip',
      length: '4 nights / 5 days',
      start: '2026-10-20T08:00:00Z',
      resort: 'Test Resort',
      perPerson: '999.00',
      image: 'reef1.jpg',
      description: 'Trip used for component testing.'
    }
  ];

  beforeEach(async () => {
    // mocks the api service to return test data
    const tripDataMock = jasmine.createSpyObj('TripData', ['getTrips']);
    tripDataMock.getTrips.and.returnValue(of(mockTrips));

    await TestBed.configureTestingModule({
      imports: [TripListing],
      providers: [
        provideRouter([]),
        { provide: TripData, useValue: tripDataMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TripListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // verifies the component initializes successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // verifies mock trip data appears in the listing
  it('should display mock trip data', () => {
    expect(component.trips.length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('Mock Test Trip');
  });
});
