import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { KeycloakService } from 'keycloak-angular';
import { LocalStorageService } from '../local-storage.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let mockKeycloakService: jasmine.SpyObj<KeycloakService>;
  let mockLocalStorageService: jasmine.SpyObj<LocalStorageService>;
  let mockKeycloakInstance: any;

  beforeEach(() => {
    mockKeycloakInstance = {
      authServerUrl: 'https://auth.example.com',
      realm: 'test-realm',
      tokenParsed: {
        user_id: 'user-123',
        name: 'Test User',
        user_type: 'practitioner',
        realm_access: { roles: ['user', 'admin'] },
        context: null
      },
      setContext: jasmine.createSpy('setContext'),
      updateToken: jasmine.createSpy('updateToken').and.returnValue(Promise.resolve(true)),
      createAccountUrl: jasmine.createSpy('createAccountUrl').and.returnValue('https://auth.example.com/account')
    };

    mockKeycloakService = jasmine.createSpyObj('KeycloakService', [
      'isLoggedIn',
      'login',
      'logout',
      'getKeycloakInstance',
      'isUserInRole'
    ]);
    mockKeycloakService.getKeycloakInstance.and.returnValue(mockKeycloakInstance);
    mockKeycloakService.isLoggedIn.and.returnValue(false);
    mockKeycloakService.isUserInRole.and.returnValue(false);

    mockLocalStorageService = jasmine.createSpyObj('LocalStorageService', [
      'getItem',
      'setItem',
      'removeItem'
    ]);
    mockLocalStorageService.getItem.and.returnValue(null);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: KeycloakService, useValue: mockKeycloakService },
        { provide: LocalStorageService, useValue: mockLocalStorageService }
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when not logged in', () => {
    mockKeycloakService.isLoggedIn.and.returnValue(false);
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should return true when logged in', () => {
    mockKeycloakService.isLoggedIn.and.returnValue(true);
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should expose availableContext$ observable', () => {
    expect(service.availableContext$).toBeDefined();
  });

  it('should expose currentContext$ observable', () => {
    expect(service.currentContext$).toBeDefined();
  });

  it('should expose userProfile$ observable', () => {
    expect(service.userProfile$).toBeDefined();
  });

  it('should delegate isUserInRole to KeycloakService', () => {
    mockKeycloakService.isUserInRole.and.returnValue(true);
    expect(service.isUserInRole('admin')).toBeTrue();
    expect(mockKeycloakService.isUserInRole).toHaveBeenCalledWith('admin');
  });

  it('should call login on KeycloakService', () => {
    mockKeycloakService.login.and.returnValue(Promise.resolve());
    service.login();
    expect(mockLocalStorageService.removeItem).toHaveBeenCalledWith('ctx');
    expect(mockKeycloakService.login).toHaveBeenCalled();
  });

  it('should call logout on KeycloakService', () => {
    mockKeycloakService.logout.and.returnValue(Promise.resolve());
    service.logout();
    expect(mockKeycloakService.logout).toHaveBeenCalled();
    expect(mockLocalStorageService.removeItem).toHaveBeenCalledWith('ctx');
  });

  describe('when logged in', () => {
    beforeEach(() => {
      mockKeycloakService.isLoggedIn.and.returnValue(true);
    });

    it('should set context when logged in', () => {
      service.setContext('org-1', 'team-1', 'patient-1', 'eoc-1');
      expect(mockKeycloakInstance.setContext).toHaveBeenCalledWith('org-1', 'team-1', 'patient-1', 'eoc-1');
      expect(mockKeycloakInstance.updateToken).toHaveBeenCalledWith(-1);
    });

    it('should add patient to context', () => {
      service.addPatientToContext('patient-123');
      expect(mockKeycloakInstance.setContext).toHaveBeenCalled();
    });

    it('should add episode of care to context', () => {
      service.addEpisodeOfCareToContext('eoc-123');
      expect(mockKeycloakInstance.setContext).toHaveBeenCalled();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      mockKeycloakService.isLoggedIn.and.returnValue(false);
    });

    it('should not set context when not logged in', () => {
      service.setContext('org-1', 'team-1');
      expect(mockKeycloakInstance.setContext).not.toHaveBeenCalled();
    });

    it('should set availableContext to null', (done) => {
      service.setAvailableContexts();
      service.availableContext$.subscribe(ctx => {
        expect(ctx).toBeNull();
        done();
      });
    });
  });
});
