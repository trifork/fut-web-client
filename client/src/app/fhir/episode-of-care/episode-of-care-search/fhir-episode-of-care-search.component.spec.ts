import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FhirEpisodeOfCareSearchComponent } from './fhir-episode-of-care-search.component';
import { FhirService } from '../../fhir.service';
import { LoadingService } from '../../../spinner/loading.service';
import { UserService } from '../../../user/user.service';

describe('FhirEpisodeOfCareSearchComponent', () => {
  let component: FhirEpisodeOfCareSearchComponent;
  let fixture: ComponentFixture<FhirEpisodeOfCareSearchComponent>;
  let mockFhirService: jasmine.SpyObj<FhirService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockLoadingService: jasmine.SpyObj<LoadingService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockFhirService = jasmine.createSpyObj('FhirService', ['searchEpisodeOfCare', 'getPage']);
    mockFhirService.searchEpisodeOfCare.and.returnValue(of({ resourceType: 'Bundle', type: 'searchset', total: 0, link: [], entry: [] }));

    mockUserService = jasmine.createSpyObj('UserService', ['isLoggedIn', 'addEpisodeOfCareToContext', 'addPatientToContext'], {
      currentContext$: new BehaviorSubject(null),
      userProfile$: new BehaviorSubject(null),
      availableContext$: new BehaviorSubject(null)
    });

    mockLoadingService = jasmine.createSpyObj('LoadingService', [], {
      loading$: new BehaviorSubject(false)
    });

    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [FhirEpisodeOfCareSearchComponent],
      providers: [
        { provide: FhirService, useValue: mockFhirService },
        { provide: UserService, useValue: mockUserService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: MatDialog, useValue: mockMatDialog }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
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
