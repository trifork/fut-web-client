import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FhirCodingComponent } from './fhir-coding.component';

describe('FhirCodingComponent', () => {
  let component: FhirCodingComponent;
  let fixture: ComponentFixture<FhirCodingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhirCodingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirCodingComponent);
    component = fixture.componentInstance;
    component.coding = {
      system: 'http://example.com',
      code: 'test-code',
      display: 'Test Code Display'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have coding input', () => {
    expect(component.coding).toBeTruthy();
    expect(component.coding.code).toBe('test-code');
  });
});
