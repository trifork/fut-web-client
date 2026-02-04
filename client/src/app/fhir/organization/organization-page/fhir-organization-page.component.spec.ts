import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FhirOrganizationPageComponent } from './fhir-organization-page.component';
import { FhirService } from '../../fhir.service';

describe('FhirOrganizationPageComponent', () => {
  let component: FhirOrganizationPageComponent;
  let fixture: ComponentFixture<FhirOrganizationPageComponent>;
  let mockFhirService: jasmine.SpyObj<FhirService>;

  const mockOrganization: fhir.Organization = {
    resourceType: 'Organization',
    id: 'org-1',
    name: 'Test Organization'
  };

  beforeEach(async () => {
    mockFhirService = jasmine.createSpyObj('FhirService', ['readOrganization']);
    mockFhirService.readOrganization.and.returnValue(of(mockOrganization));

    await TestBed.configureTestingModule({
      declarations: [FhirOrganizationPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 'org-1' }) } },
        { provide: FhirService, useValue: mockFhirService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirOrganizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load organization on init', () => {
    expect(mockFhirService.readOrganization).toHaveBeenCalledWith('org-1');
    expect(component.organization).toBeTruthy();
  });
});
