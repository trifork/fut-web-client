import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirAppointmentDetailComponent } from './fhir-appointment-detail.component';

describe('FhirAppointmentDetailComponent', () => {
  let component: FhirAppointmentDetailComponent;
  let fixture: ComponentFixture<FhirAppointmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirAppointmentDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirAppointmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
