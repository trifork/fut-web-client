import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FhirCareTeamSearchComponent } from './fhir-care-team-search.component';
import { FhirService } from '../../fhir.service';
import { LoadingService } from '../../../spinner/loading.service';

describe('FhirCareTeamSearchComponent', () => {
  let component: FhirCareTeamSearchComponent;
  let fixture: ComponentFixture<FhirCareTeamSearchComponent>;
  let mockFhirService: jasmine.SpyObj<FhirService>;
  let mockLoadingService: jasmine.SpyObj<LoadingService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockFhirService = jasmine.createSpyObj('FhirService', ['searchCareTeam', 'getPage']);
    mockFhirService.searchCareTeam.and.returnValue(of({ resourceType: 'Bundle', type: 'searchset', total: 0, link: [], entry: [] }));

    mockLoadingService = jasmine.createSpyObj('LoadingService', [], {
      loading$: new BehaviorSubject(false)
    });

    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [FhirCareTeamSearchComponent],
      providers: [
        { provide: FhirService, useValue: mockFhirService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: MatDialog, useValue: mockMatDialog }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirCareTeamSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
