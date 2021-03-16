import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirIdentifiersComponent } from './fhir-identifiers.component';

describe('FhirIdentifiersComponent', () => {
  let component: FhirIdentifiersComponent;
  let fixture: ComponentFixture<FhirIdentifiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirIdentifiersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirIdentifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
