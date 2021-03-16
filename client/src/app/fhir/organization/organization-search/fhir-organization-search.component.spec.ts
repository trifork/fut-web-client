import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirOrganizationSearchComponent } from './fhir-organization-search.component';

describe('FhirOrganizationSearchComponent', () => {
  let component: FhirOrganizationSearchComponent;
  let fixture: ComponentFixture<FhirOrganizationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirOrganizationSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirOrganizationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
