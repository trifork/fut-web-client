import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirContactPointsComponent } from './fhir-contact-points.component';

describe('FhirContactPointsComponent', () => {
  let component: FhirContactPointsComponent;
  let fixture: ComponentFixture<FhirContactPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirContactPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirContactPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
