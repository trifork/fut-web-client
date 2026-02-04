import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FhirPatientPageComponent } from './fhir-patient-page.component';
import { FhirService } from '../../fhir.service';

describe('FhirPatientPageComponent', () => {
  let component: FhirPatientPageComponent;
  let fixture: ComponentFixture<FhirPatientPageComponent>;
  let mockFhirService: jasmine.SpyObj<FhirService>;

  const mockPatient: fhir.Patient = {
    resourceType: 'Patient',
    id: 'patient-1',
    name: [{ family: 'Doe', given: ['John'], use: 'official' }],
    gender: 'male',
    birthDate: '1990-01-01'
  };

  beforeEach(async () => {
    mockFhirService = jasmine.createSpyObj('FhirService', ['readPatient']);
    mockFhirService.readPatient.and.returnValue(of(mockPatient));

    await TestBed.configureTestingModule({
      declarations: [FhirPatientPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 'patient-1' }) } },
        { provide: FhirService, useValue: mockFhirService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirPatientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load patient on init', () => {
    expect(mockFhirService.readPatient).toHaveBeenCalledWith('patient-1');
    expect(component.patient).toBeTruthy();
  });
});
