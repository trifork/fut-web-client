import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserService } from './user/user.service';
import { BehaviorSubject } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['isLoggedIn', 'login', 'logout'], {
      currentContext$: new BehaviorSubject(null),
      userProfile$: new BehaviorSubject(null),
      availableContext$: new BehaviorSubject(null)
    });
    mockUserService.isLoggedIn.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        RouterTestingModule
      ],
      declarations: [AppComponent],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have title "client"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('client');
  });

  it('should have a version from package.json', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.version).toBeDefined();
    expect(app.version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('should have showSidenav set to true by default', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.showSidenav).toBeTrue();
  });

  it('should inject UserService', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.userService).toBeTruthy();
  });
});
