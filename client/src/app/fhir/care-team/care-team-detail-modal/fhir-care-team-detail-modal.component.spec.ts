import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FhirCareTeamDetailModalComponent } from './fhir-care-team-detail-modal.component';

describe('FhirCareTeamDetailModalComponent', () => {
  let component: FhirCareTeamDetailModalComponent;
  let fixture: ComponentFixture<FhirCareTeamDetailModalComponent>;

  const mockCareTeam: fhir.CareTeam = {
    resourceType: 'CareTeam',
    id: 'team-1',
    name: 'Test Care Team',
    status: 'active'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhirCareTeamDetailModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { careTeam: mockCareTeam } },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirCareTeamDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive care team data', () => {
    expect(component.data.careTeam).toBeTruthy();
    expect(component.data.careTeam.id).toBe('team-1');
  });
});
