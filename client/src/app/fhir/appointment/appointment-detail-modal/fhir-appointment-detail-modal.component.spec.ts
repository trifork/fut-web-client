import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirAppointmentDetailModalComponent } from './fhir-appointment-detail-modal.component';

describe('FhirAppointmentDetailModalComponent', () => {
  let component: FhirAppointmentDetailModalComponent;
  let fixture: ComponentFixture<FhirAppointmentDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirAppointmentDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirAppointmentDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
