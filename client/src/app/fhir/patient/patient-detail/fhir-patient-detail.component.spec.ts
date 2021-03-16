import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirPatientDetailComponent } from './fhir-patient-detail.component';

describe('FhirPatientDetailComponent', () => {
  let component: FhirPatientDetailComponent;
  let fixture: ComponentFixture<FhirPatientDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirPatientDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirPatientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
