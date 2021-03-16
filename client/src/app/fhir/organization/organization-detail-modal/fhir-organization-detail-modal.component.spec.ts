import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirOrganizationDetailModalComponent } from './fhir-organization-detail-modal.component';

describe('FhirOrganizationDetailModalComponent', () => {
  let component: FhirOrganizationDetailModalComponent;
  let fixture: ComponentFixture<FhirOrganizationDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirOrganizationDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirOrganizationDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
