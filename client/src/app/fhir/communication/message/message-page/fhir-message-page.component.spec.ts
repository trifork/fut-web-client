import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FhirMessagePageComponent } from './fhir-message-page.component';
import { FhirService } from '../../../fhir.service';

describe('FhirMessagePageComponent', () => {
  let component: FhirMessagePageComponent;
  let fixture: ComponentFixture<FhirMessagePageComponent>;
  let mockFhirService: jasmine.SpyObj<FhirService>;

  const mockMessage: fhir.Communication = {
    resourceType: 'Communication',
    id: 'message-1',
    status: 'completed'
  };

  beforeEach(async () => {
    mockFhirService = jasmine.createSpyObj('FhirService', ['readMessage']);
    mockFhirService.readMessage.and.returnValue(of(mockMessage));

    await TestBed.configureTestingModule({
      declarations: [FhirMessagePageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 'message-1' }) } },
        { provide: FhirService, useValue: mockFhirService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirMessagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load message on init', () => {
    expect(mockFhirService.readMessage).toHaveBeenCalledWith('message-1');
    expect(component.message).toBeTruthy();
  });
});
