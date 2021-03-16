import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirOrganizationPageComponent } from './fhir-organization-page.component';

describe('FhirOrganizationPageComponent', () => {
  let component: FhirOrganizationPageComponent;
  let fixture: ComponentFixture<FhirOrganizationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirOrganizationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirOrganizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
