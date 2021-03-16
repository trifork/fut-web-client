import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirPatientSearchComponent } from './fhir-patient-search.component';

describe('FhirPatientSearchComponent', () => {
  let component: FhirPatientSearchComponent;
  let fixture: ComponentFixture<FhirPatientSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirPatientSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirPatientSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
