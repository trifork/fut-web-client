import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirAddressesComponent } from './fhir-addresses.component';

describe('FhirAddressesComponent', () => {
  let component: FhirAddressesComponent;
  let fixture: ComponentFixture<FhirAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirAddressesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
