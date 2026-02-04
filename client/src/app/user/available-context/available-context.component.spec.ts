import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AvailableContextComponent } from './available-context.component';
import { UserService } from '../user.service';

describe('AvailableContextComponent', () => {
  let component: AvailableContextComponent;
  let fixture: ComponentFixture<AvailableContextComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['isLoggedIn', 'setContext'], {
      currentContext$: new BehaviorSubject(null),
      userProfile$: new BehaviorSubject(null),
      availableContext$: new BehaviorSubject(null)
    });

    await TestBed.configureTestingModule({
      declarations: [AvailableContextComponent],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject UserService', () => {
    expect(component.userService).toBeTruthy();
  });
});
