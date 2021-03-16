import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirCareTeamDetailComponent } from './fhir-care-team-detail.component';

describe('FhirCareTeamDetailComponent', () => {
  let component: FhirCareTeamDetailComponent;
  let fixture: ComponentFixture<FhirCareTeamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirCareTeamDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirCareTeamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
