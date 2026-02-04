import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FhirCodeableConeptComponent } from './fhir-codeable-conept.component';

describe('FhirCodeableConeptComponent', () => {
  let component: FhirCodeableConeptComponent;
  let fixture: ComponentFixture<FhirCodeableConeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhirCodeableConeptComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirCodeableConeptComponent);
    component = fixture.componentInstance;
    component.codeableConcept = {
      coding: [
        { system: 'http://example.com', code: 'test', display: 'Test Code' }
      ],
      text: 'Test CodeableConcept'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have codeableConcept input', () => {
    expect(component.codeableConcept).toBeTruthy();
    expect(component.codeableConcept.coding?.length).toBe(1);
  });
});
