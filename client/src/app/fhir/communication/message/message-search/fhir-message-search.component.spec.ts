import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirMessageSearchComponent } from './fhir-message-search.component';

describe('FhirMessageSearchComponent', () => {
  let component: FhirMessageSearchComponent;
  let fixture: ComponentFixture<FhirMessageSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirMessageSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirMessageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
