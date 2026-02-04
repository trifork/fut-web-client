import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserControlComponent } from './user-control.component';
import { UserService } from '../user.service';

describe('UserControlComponent', () => {
  let component: UserControlComponent;
  let fixture: ComponentFixture<UserControlComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['isLoggedIn', 'login', 'logout'], {
      userProfile$: new BehaviorSubject({ id: 'user-1', name: 'Test User', type: 'practitioner', roles: ['user'], url: 'https://auth.example.com/account', context: null }),
      currentContext$: new BehaviorSubject(null),
      availableContext$: new BehaviorSubject(null)
    });
    mockUserService.isLoggedIn.and.returnValue(true);

    await TestBed.configureTestingModule({
      declarations: [UserControlComponent],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check login status on init', () => {
    expect(mockUserService.isLoggedIn).toHaveBeenCalled();
  });

  it('should be logged in when UserService returns true', () => {
    expect(component.isLoggedIn).toBeTrue();
  });
});
