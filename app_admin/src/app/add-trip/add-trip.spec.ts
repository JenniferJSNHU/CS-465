
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AddTrip } from './add-trip';
import { TripData } from '../trip-data';
import { Trip } from '../trip';

describe('AddTrip', () => {
  let component: AddTrip;
  let fixture: ComponentFixture<AddTrip>;
  let tripDataMock: jasmine.SpyObj<TripData>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // mocks api requests and navigation without accessing mongodb
    tripDataMock = jasmine.createSpyObj('TripData', ['addTrip']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    tripDataMock.addTrip.and.returnValue(of(new Trip()));

    await TestBed.configureTestingModule({
      imports: [AddTrip],
      providers: [
        { provide: TripData, useValue: tripDataMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTrip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // verifies the component initializes successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // verifies trip data is submitted through the mocked service
  it('should submit a new trip', () => {
    component.trip.code = 'TEST001';
    component.trip.name = 'Mock Test Trip';

    component.onSubmit();

    expect(tripDataMock.addTrip).toHaveBeenCalledWith(component.trip);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});
