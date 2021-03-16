import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirOrganizationDetailComponent } from './fhir-organization-detail.component';

describe('FhirOrganizationDetailComponent', () => {
  let component: FhirOrganizationDetailComponent;
  let fixture: ComponentFixture<FhirOrganizationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirOrganizationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirOrganizationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
