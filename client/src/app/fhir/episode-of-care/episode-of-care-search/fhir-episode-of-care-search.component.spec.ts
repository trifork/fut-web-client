import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirEpisodeOfCareSearchComponent } from './fhir-episode-of-care-search.component';

describe('FhirEpisodeOfCareSearchComponent', () => {
  let component: FhirEpisodeOfCareSearchComponent;
  let fixture: ComponentFixture<FhirEpisodeOfCareSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirEpisodeOfCareSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirEpisodeOfCareSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
