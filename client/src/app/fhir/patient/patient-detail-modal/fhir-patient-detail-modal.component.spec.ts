import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FhirPatientDetailModalComponent } from './fhir-patient-detail-modal.component';

describe('FhirPatientDetailModalComponent', () => {
  let component: FhirPatientDetailModalComponent;
  let fixture: ComponentFixture<FhirPatientDetailModalComponent>;

  const mockPatient: fhir.Patient = {
    resourceType: 'Patient',
    id: 'patient-1',
    name: [{ family: 'Doe', given: ['John'], use: 'official' }],
    gender: 'male',
    birthDate: '1990-01-01'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhirPatientDetailModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { patient: mockPatient } },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirPatientDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive patient data', () => {
    expect(component.data.patient).toBeTruthy();
    expect(component.data.patient.id).toBe('patient-1');
  });
});
