import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirMessageDetailComponent } from './fhir-message-detail.component';

describe('FhirMessageDetailComponent', () => {
  let component: FhirMessageDetailComponent;
  let fixture: ComponentFixture<FhirMessageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirMessageDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirMessageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
