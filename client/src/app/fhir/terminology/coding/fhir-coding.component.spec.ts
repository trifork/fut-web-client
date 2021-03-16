import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirCodingComponent } from './fhir-coding.component';

describe('FhirCodingComponent', () => {
  let component: FhirCodingComponent;
  let fixture: ComponentFixture<FhirCodingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirCodingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirCodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
