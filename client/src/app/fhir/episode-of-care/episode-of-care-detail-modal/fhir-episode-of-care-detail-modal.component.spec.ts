import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FhirEpisodeOfCareDetailModalComponent } from './fhir-episode-of-care-detail-modal.component';

describe('FhirEpisodeOfCareDetailModalComponent', () => {
  let component: FhirEpisodeOfCareDetailModalComponent;
  let fixture: ComponentFixture<FhirEpisodeOfCareDetailModalComponent>;

  const mockEpisodeOfCare: fhir.EpisodeOfCare = {
    resourceType: 'EpisodeOfCare',
    id: 'eoc-1',
    status: 'active',
    patient: { reference: 'Patient/patient-1' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhirEpisodeOfCareDetailModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { episodeOfCare: mockEpisodeOfCare } },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirEpisodeOfCareDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive episode of care data', () => {
    expect(component.data.episodeOfCare).toBeTruthy();
    expect(component.data.episodeOfCare.id).toBe('eoc-1');
  });
});
