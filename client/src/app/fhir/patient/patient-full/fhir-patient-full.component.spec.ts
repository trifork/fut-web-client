import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirPatientFullComponent } from './fhir-patient-full.component';

describe('FhirPatientFullComponent', () => {
  let component: FhirPatientFullComponent;
  let fixture: ComponentFixture<FhirPatientFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirPatientFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirPatientFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
