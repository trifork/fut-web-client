import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContextBarComponent } from './context-bar.component';
import { UserService } from '../user/user.service';

describe('ContextBarComponent', () => {
  let component: ContextBarComponent;
  let fixture: ComponentFixture<ContextBarComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['isLoggedIn'], {
      currentContext$: new BehaviorSubject(null),
      userProfile$: new BehaviorSubject(null),
      availableContext$: new BehaviorSubject(null)
    });

    await TestBed.configureTestingModule({
      declarations: [ContextBarComponent],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no context initially', () => {
    expect(component.hasContext).toBeFalse();
  });
});
