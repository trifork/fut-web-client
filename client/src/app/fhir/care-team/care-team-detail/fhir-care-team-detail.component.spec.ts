import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FhirCareTeamDetailComponent } from './fhir-care-team-detail.component';

describe('FhirCareTeamDetailComponent', () => {
  let component: FhirCareTeamDetailComponent;
  let fixture: ComponentFixture<FhirCareTeamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhirCareTeamDetailComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirCareTeamDetailComponent);
    component = fixture.componentInstance;
    component.careTeam = {
      resourceType: 'CareTeam',
      id: 'team-1',
      name: 'Test Care Team',
      status: 'active'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have care team input', () => {
    expect(component.careTeam).toBeTruthy();
    expect(component.careTeam.id).toBe('team-1');
  });
});
