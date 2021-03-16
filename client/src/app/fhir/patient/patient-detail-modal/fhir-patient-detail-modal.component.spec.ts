import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirPatientDetailModalComponent } from './fhir-patient-detail-modal.component';

describe('FhirPatientDetailModalComponent', () => {
  let component: FhirPatientDetailModalComponent;
  let fixture: ComponentFixture<FhirPatientDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirPatientDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirPatientDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
