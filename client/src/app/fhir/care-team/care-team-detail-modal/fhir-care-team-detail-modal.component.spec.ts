import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirCareTeamDetailModalComponent } from './fhir-care-team-detail-modal.component';

describe('FhirCareTeamDetailModalComponent', () => {
  let component: FhirCareTeamDetailModalComponent;
  let fixture: ComponentFixture<FhirCareTeamDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirCareTeamDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirCareTeamDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
