import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FhirAppointmentSearchComponent } from './fhir-appointment-search.component';
import { FhirService } from '../../fhir.service';
import { LoadingService } from '../../../spinner/loading.service';

describe('FhirAppointmentSearchComponent', () => {
  let component: FhirAppointmentSearchComponent;
  let fixture: ComponentFixture<FhirAppointmentSearchComponent>;
  let mockFhirService: jasmine.SpyObj<FhirService>;
  let mockLoadingService: jasmine.SpyObj<LoadingService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockFhirService = jasmine.createSpyObj('FhirService', ['searchAppointment', 'getPage']);
    mockFhirService.searchAppointment.and.returnValue(of({ resourceType: 'Bundle', type: 'searchset', total: 0, link: [], entry: [] }));

    mockLoadingService = jasmine.createSpyObj('LoadingService', [], {
      loading$: new BehaviorSubject(false)
    });

    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [FhirAppointmentSearchComponent],
      providers: [
        { provide: FhirService, useValue: mockFhirService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: MatDialog, useValue: mockMatDialog }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirAppointmentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
