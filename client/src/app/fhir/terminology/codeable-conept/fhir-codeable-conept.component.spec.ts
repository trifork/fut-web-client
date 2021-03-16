import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirCodeableConeptComponent } from './fhir-codeable-conept.component';

describe('FhirCodeableConeptComponent', () => {
  let component: FhirCodeableConeptComponent;
  let fixture: ComponentFixture<FhirCodeableConeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirCodeableConeptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirCodeableConeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
