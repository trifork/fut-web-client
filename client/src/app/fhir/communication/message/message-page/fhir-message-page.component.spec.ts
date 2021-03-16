import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirMessagePageComponent } from './fhir-message-page.component';

describe('FhirMessagePageComponent', () => {
  let component: FhirMessagePageComponent;
  let fixture: ComponentFixture<FhirMessagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirMessagePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirMessagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
