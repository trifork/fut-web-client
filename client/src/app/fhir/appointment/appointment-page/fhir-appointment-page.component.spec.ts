import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FhirAppointmentPageComponent } from './fhir-appointment-page.component';
import { FhirService } from '../../fhir.service';

describe('FhirAppointmentPageComponent', () => {
  let component: FhirAppointmentPageComponent;
  let fixture: ComponentFixture<FhirAppointmentPageComponent>;
  let mockFhirService: jasmine.SpyObj<FhirService>;

  const mockAppointment: fhir.Appointment = {
    resourceType: 'Appointment',
    id: 'appointment-1',
    status: 'booked',
    start: '2024-01-01T10:00:00Z',
    end: '2024-01-01T11:00:00Z',
    participant: []
  };

  beforeEach(async () => {
    mockFhirService = jasmine.createSpyObj('FhirService', ['readAppointment']);
    mockFhirService.readAppointment.and.returnValue(of(mockAppointment));

    await TestBed.configureTestingModule({
      declarations: [FhirAppointmentPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 'appointment-1' }) } },
        { provide: FhirService, useValue: mockFhirService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirAppointmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load appointment on init', () => {
    expect(mockFhirService.readAppointment).toHaveBeenCalledWith('appointment-1');
    expect(component.appointment).toBeTruthy();
  });
});
