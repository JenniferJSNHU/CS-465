
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TripCard } from './trip-card';
import { Trip } from '../trip';

describe('TripCard', () => {
  let component: TripCard;
  let fixture: ComponentFixture<TripCard>;

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
    await TestBed.configureTestingModule({
      imports: [TripCard],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(TripCard);
    component = fixture.componentInstance;

    // supplies the trip data required by the component
    component.trip = { ...mockTrip };
    fixture.detectChanges();
  });

  // verifies the component initializes successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // verifies the trip information appears on the card
  it('should display trip information', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Mock Test Trip');
    expect(compiled.textContent).toContain('TEST001');
    expect(compiled.textContent).toContain('999.00');
  });

  // verifies a confirmed deletion notifies the parent component
  it('should emit a deletion request when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component.deleteRequested, 'emit');

    component.confirmDelete();

    expect(component.deleteRequested.emit).toHaveBeenCalledWith('TEST001');
  });

  // verifies a canceled deletion does not emit a request
  it('should not emit a deletion request when canceled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(component.deleteRequested, 'emit');

    component.confirmDelete();

    expect(component.deleteRequested.emit).not.toHaveBeenCalled();
  });
});
