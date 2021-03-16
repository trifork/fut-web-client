import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirMessageDetailModalComponent } from './fhir-message-detail-modal.component';

describe('FhirMessageDetailModalComponent', () => {
  let component: FhirMessageDetailModalComponent;
  let fixture: ComponentFixture<FhirMessageDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirMessageDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirMessageDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
