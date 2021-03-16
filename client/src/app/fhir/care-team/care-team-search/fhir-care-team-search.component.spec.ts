import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirCareTeamSearchComponent } from './fhir-care-team-search.component';

describe('FhirCareTeamSearchComponent', () => {
  let component: FhirCareTeamSearchComponent;
  let fixture: ComponentFixture<FhirCareTeamSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirCareTeamSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirCareTeamSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
