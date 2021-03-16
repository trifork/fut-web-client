import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirEpisodeOfCareDetailModalComponent } from './fhir-episode-of-care-detail-modal.component';

describe('FhirEpisodeOfCareDetailModalComponent', () => {
  let component: FhirEpisodeOfCareDetailModalComponent;
  let fixture: ComponentFixture<FhirEpisodeOfCareDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirEpisodeOfCareDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirEpisodeOfCareDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
