import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FhirAppointmentDetailModalComponent } from './fhir-appointment-detail-modal.component';

describe('FhirAppointmentDetailModalComponent', () => {
  let component: FhirAppointmentDetailModalComponent;
  let fixture: ComponentFixture<FhirAppointmentDetailModalComponent>;

  const mockAppointment: fhir.Appointment = {
    resourceType: 'Appointment',
    id: 'appointment-1',
    status: 'booked',
    start: '2024-01-01T10:00:00Z',
    end: '2024-01-01T11:00:00Z',
    participant: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhirAppointmentDetailModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { appointment: mockAppointment } },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirAppointmentDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive appointment data', () => {
    expect(component.data.appointment).toBeTruthy();
    expect(component.data.appointment.id).toBe('appointment-1');
  });
});
