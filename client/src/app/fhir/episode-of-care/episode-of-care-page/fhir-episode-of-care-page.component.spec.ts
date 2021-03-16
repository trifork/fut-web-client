import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirEpisodeOfCarePageComponent } from './fhir-episode-of-care-page.component';

describe('FhirEpisodeOfCarePageComponent', () => {
  let component: FhirEpisodeOfCarePageComponent;
  let fixture: ComponentFixture<FhirEpisodeOfCarePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirEpisodeOfCarePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirEpisodeOfCarePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
