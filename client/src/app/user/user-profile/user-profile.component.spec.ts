import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfileComponent } from './user-profile.component';
import { UserService } from '../user.service';
import { FhirService } from '../../fhir/fhir.service';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockFhirService: jasmine.SpyObj<FhirService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['isLoggedIn'], {
      userProfile$: new BehaviorSubject({ userId: 'user-1', name: 'Test User', userType: 'practitioner', roles: ['user'] }),
      currentContext$: new BehaviorSubject(null),
      availableContext$: new BehaviorSubject(null)
    });

    mockFhirService = jasmine.createSpyObj('FhirService', ['readPatient', 'readOrganization', 'readCareTeam']);

    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: FhirService, useValue: mockFhirService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject UserService', () => {
    expect(component.userService).toBeTruthy();
  });

  it('should inject FhirService', () => {
    expect(component.fhir).toBeTruthy();
  });
});
