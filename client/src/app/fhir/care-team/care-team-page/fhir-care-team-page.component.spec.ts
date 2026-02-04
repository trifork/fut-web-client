import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FhirCareTeamPageComponent } from './fhir-care-team-page.component';
import { FhirService } from '../../fhir.service';

describe('FhirCareTeamComponent', () => {
  let component: FhirCareTeamPageComponent;
  let fixture: ComponentFixture<FhirCareTeamPageComponent>;
  let mockFhirService: jasmine.SpyObj<FhirService>;

  const mockCareTeam: fhir.CareTeam = {
    resourceType: 'CareTeam',
    id: 'team-1',
    name: 'Test Care Team',
    status: 'active'
  };

  beforeEach(async () => {
    mockFhirService = jasmine.createSpyObj('FhirService', ['readCareTeam']);
    mockFhirService.readCareTeam.and.returnValue(of(mockCareTeam));

    await TestBed.configureTestingModule({
      declarations: [FhirCareTeamPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 'team-1' }) } },
        { provide: FhirService, useValue: mockFhirService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirCareTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load care team on init', () => {
    expect(mockFhirService.readCareTeam).toHaveBeenCalledWith('team-1');
    expect(component.careTeam).toBeTruthy();
  });
});
