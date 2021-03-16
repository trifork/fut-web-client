import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirAppointmentPageComponent } from './fhir-appointment-page.component';

describe('FhirAppointmentPageComponent', () => {
  let component: FhirAppointmentPageComponent;
  let fixture: ComponentFixture<FhirAppointmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirAppointmentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirAppointmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
