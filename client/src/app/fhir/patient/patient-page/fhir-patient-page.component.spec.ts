import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirPatientPageComponent } from './fhir-patient-page.component';

describe('FhirPatientPageComponent', () => {
  let component: FhirPatientPageComponent;
  let fixture: ComponentFixture<FhirPatientPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirPatientPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirPatientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
