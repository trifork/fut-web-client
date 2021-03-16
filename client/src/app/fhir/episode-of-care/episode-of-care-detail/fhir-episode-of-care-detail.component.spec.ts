import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirEpisodeOfCareDetailComponent } from './fhir-episode-of-care-detail.component';

describe('FhirEpisodeOfCareDetailComponent', () => {
  let component: FhirEpisodeOfCareDetailComponent;
  let fixture: ComponentFixture<FhirEpisodeOfCareDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirEpisodeOfCareDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirEpisodeOfCareDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
