
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { EditTrip } from './edit-trip';
import { TripData } from '../trip-data';
import { Trip } from '../trip';

describe('EditTrip', () => {
  let component: EditTrip;
  let fixture: ComponentFixture<EditTrip>;

  // provides sample trip data without accessing mongodb
  const mockTrip: Trip = {
    code: 'TEST001',
    name: 'Mock Test Trip',
    length: '4 nights / 5 days',
    start: '2026-10-20T08:00:00Z',
    resort: 'Test Resort',
    perPerson: '999.00',
    image: 'reef1.jpg',
    description: 'Trip used for component testing.'
  };

  beforeEach(async () => {
    // mocks the api methods used by the edit component
    const tripDataMock = jasmine.createSpyObj('TripData', [
      'getTrip',
      'updateTrip'
    ]);

    tripDataMock.getTrip.and.returnValue(of({ ...mockTrip }));

    await TestBed.configureTestingModule({
      imports: [EditTrip],
      providers: [
        provideRouter([]),
        { provide: TripData, useValue: tripDataMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ tripCode: 'TEST001' })
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTrip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // verifies the edit component initializes successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // verifies the selected trip is loaded from the mock service
  it('should load the selected trip', () => {
    expect(component.trip.code).toBe('TEST001');
    expect(component.trip.name).toBe('Mock Test Trip');
    expect(component.isLoading).toBeFalse();
  });

  // verifies the date is formatted for the edit form
  it('should format the trip date', () => {
    expect(component.trip.start).toBe('2026-10-20');
  });
});
