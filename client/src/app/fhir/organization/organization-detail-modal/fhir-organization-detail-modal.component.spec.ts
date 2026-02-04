import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FhirOrganizationDetailModalComponent } from './fhir-organization-detail-modal.component';

describe('FhirOrganizationDetailModalComponent', () => {
  let component: FhirOrganizationDetailModalComponent;
  let fixture: ComponentFixture<FhirOrganizationDetailModalComponent>;

  const mockOrganization: fhir.Organization = {
    resourceType: 'Organization',
    id: 'org-1',
    name: 'Test Organization'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhirOrganizationDetailModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { organization: mockOrganization } },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirOrganizationDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive organization data', () => {
    expect(component.data.organization).toBeTruthy();
    expect(component.data.organization.id).toBe('org-1');
  });
});
