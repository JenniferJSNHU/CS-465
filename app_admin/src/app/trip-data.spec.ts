
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TripData } from './trip-data';
import { Trip } from './trip';

describe('TripData', () => {
  let service: TripData;
  let httpMock: HttpTestingController;

  // provides sample trip data for api testing
  const mockTrip: Trip = {
    code: 'TEST001',
    name: 'Mock Test Trip',
    length: '4 nights / 5 days',
    start: '2026-10-20T08:00:00Z',
    resort: 'Test Resort',
    perPerson: '999.00',
    image: 'reef1.jpg',
    description: 'Trip used for service testing.'
  };

  const apiUrl = 'http://localhost:3000/api/trips';

  beforeEach(() => {
    // configures a mock http client instead of the real api
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(TripData);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // verifies that no unexpected http requests remain
    httpMock.verify();
  });

  // verifies the service initializes successfully
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // verifies get retrieves all trips
  it('should retrieve all trips', () => {
    service.getTrips().subscribe(trips => {
      expect(trips).toEqual([mockTrip]);
    });

    const request = httpMock.expectOne(apiUrl);
    expect(request.request.method).toBe('GET');
    request.flush([mockTrip]);
  });

  // verifies get retrieves a single trip by code
  it('should retrieve a trip by code', () => {
    service.getTrip('TEST001').subscribe(trip => {
      expect(trip).toEqual(mockTrip);
    });

    const request = httpMock.expectOne(`${apiUrl}/TEST001`);
    expect(request.request.method).toBe('GET');
    request.flush(mockTrip);
  });

  // verifies post submits a new trip
  it('should add a new trip', () => {
    service.addTrip(mockTrip).subscribe(trip => {
      expect(trip).toEqual(mockTrip);
    });

    const request = httpMock.expectOne(apiUrl);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(mockTrip);
    request.flush(mockTrip);
  });

  // verifies put updates an existing trip
  it('should update an existing trip', () => {
    service.updateTrip('TEST001', mockTrip).subscribe(trip => {
      expect(trip).toEqual(mockTrip);
    });

    const request = httpMock.expectOne(`${apiUrl}/TEST001`);
    expect(request.request.method).toBe('PUT');
    request.flush(mockTrip);
  });

  // verifies delete removes the selected trip
  it('should delete an existing trip', () => {
    const response = {
      message: 'Trip deleted successfully',
      trip: mockTrip
    };

    service.deleteTrip('TEST001').subscribe(result => {
      expect(result).toEqual(response);
    });

    const request = httpMock.expectOne(`${apiUrl}/TEST001`);
    expect(request.request.method).toBe('DELETE');
    request.flush(response);
  });
});
