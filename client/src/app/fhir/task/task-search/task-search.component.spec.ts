import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TaskSearchComponent } from './task-search.component';
import { FhirService } from '../../fhir.service';
import { LoadingService } from '../../../spinner/loading.service';
import { UserService } from '../../../user/user.service';

describe('TaskSearchComponent', () => {
  let component: TaskSearchComponent;
  let fixture: ComponentFixture<TaskSearchComponent>;
  let mockFhirService: jasmine.SpyObj<FhirService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockLoadingService: jasmine.SpyObj<LoadingService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockFhirService = jasmine.createSpyObj('FhirService', ['searchTask', 'getPage']);
    mockFhirService.searchTask.and.returnValue(of({ resourceType: 'Bundle', type: 'searchset', total: 0, link: [], entry: [] }));

    mockUserService = jasmine.createSpyObj('UserService', ['isLoggedIn'], {
      currentContext$: new BehaviorSubject(null),
      userProfile$: new BehaviorSubject(null),
      availableContext$: new BehaviorSubject(null)
    });

    mockLoadingService = jasmine.createSpyObj('LoadingService', [], {
      loading$: new BehaviorSubject(false)
    });

    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [TaskSearchComponent],
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
    fixture = TestBed.createComponent(TaskSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
