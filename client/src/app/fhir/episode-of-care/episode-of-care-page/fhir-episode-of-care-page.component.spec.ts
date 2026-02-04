import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FhirEpisodeOfCarePageComponent } from './fhir-episode-of-care-page.component';
import { FhirService } from '../../fhir.service';

describe('FhirEpisodeOfCarePageComponent', () => {
  let component: FhirEpisodeOfCarePageComponent;
  let fixture: ComponentFixture<FhirEpisodeOfCarePageComponent>;
  let mockFhirService: jasmine.SpyObj<FhirService>;

  const mockEpisodeOfCare: fhir.EpisodeOfCare = {
    resourceType: 'EpisodeOfCare',
    id: 'eoc-1',
    status: 'active',
    patient: { reference: 'Patient/patient-1' }
  };

  beforeEach(async () => {
    mockFhirService = jasmine.createSpyObj('FhirService', ['readEpisodeOfCare']);
    mockFhirService.readEpisodeOfCare.and.returnValue(of(mockEpisodeOfCare));

    await TestBed.configureTestingModule({
      declarations: [FhirEpisodeOfCarePageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 'eoc-1' }) } },
        { provide: FhirService, useValue: mockFhirService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirEpisodeOfCarePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load episode of care on init', () => {
    expect(mockFhirService.readEpisodeOfCare).toHaveBeenCalledWith('eoc-1');
    expect(component.episodeOfCare).toBeTruthy();
  });
});
