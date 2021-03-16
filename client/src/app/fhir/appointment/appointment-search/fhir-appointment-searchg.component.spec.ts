import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirAppointmentSearchComponent } from './fhir-appointment-search.component';

describe('FhirAppointmentSearchComponent', () => {
  let component: FhirAppointmentSearchComponent;
  let fixture: ComponentFixture<FhirAppointmentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirAppointmentSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirAppointmentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
