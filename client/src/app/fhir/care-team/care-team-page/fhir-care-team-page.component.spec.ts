import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirCareTeamPageComponent } from './fhir-care-team-page.component';

describe('FhirCareTeamComponent', () => {
  let component: FhirCareTeamPageComponent;
  let fixture: ComponentFixture<FhirCareTeamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirCareTeamPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirCareTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
