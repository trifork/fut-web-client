import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FhirMessageDetailModalComponent } from './fhir-message-detail-modal.component';

describe('FhirMessageDetailModalComponent', () => {
  let component: FhirMessageDetailModalComponent;
  let fixture: ComponentFixture<FhirMessageDetailModalComponent>;

  const mockMessage: fhir.Communication = {
    resourceType: 'Communication',
    id: 'message-1',
    status: 'completed'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhirMessageDetailModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { message: mockMessage } },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirMessageDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive message data', () => {
    expect(component.data.message).toBeTruthy();
    expect(component.data.message.id).toBe('message-1');
  });
});
