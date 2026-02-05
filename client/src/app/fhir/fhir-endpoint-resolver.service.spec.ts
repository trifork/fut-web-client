import { TestBed } from '@angular/core/testing';
import { FhirEndpointResolverService } from './fhir-endpoint-resolver.service';
import {
  DEFAULT_MULTI_SERVER_CONFIG,
  DEFAULT_SINGLE_SERVER_CONFIG,
  FHIR_ENDPOINT_CONFIG,
  FhirEndpointConfig
} from './fhir-endpoint.config';

describe('FhirEndpointResolverService', () => {

  describe('with multi-server config', () => {
    let service: FhirEndpointResolverService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          FhirEndpointResolverService,
          { provide: FHIR_ENDPOINT_CONFIG, useValue: DEFAULT_MULTI_SERVER_CONFIG }
        ]
      });
      service = TestBed.inject(FhirEndpointResolverService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('getBasePath', () => {
      it('should return patient-service path for Patient', () => {
        expect(service.getBasePath('Patient')).toBe('/patient-service/fhir');
      });

      it('should return patient-service path for Appointment', () => {
        expect(service.getBasePath('Appointment')).toBe('/patient-service/fhir');
      });

      it('should return patient-service path for Communication', () => {
        expect(service.getBasePath('Communication')).toBe('/patient-service/fhir');
      });

      it('should return organization-service path for Organization', () => {
        expect(service.getBasePath('Organization')).toBe('/organization-service/fhir');
      });

      it('should return organization-service path for CareTeam', () => {
        expect(service.getBasePath('CareTeam')).toBe('/organization-service/fhir');
      });

      it('should return care-plan-service path for EpisodeOfCare', () => {
        expect(service.getBasePath('EpisodeOfCare')).toBe('/care-plan-service/fhir');
      });

      it('should return task-service path for Task', () => {
        expect(service.getBasePath('Task')).toBe('/task-service/fhir');
      });
    });

    describe('buildResourceUrl', () => {
      it('should build URL for Patient search', () => {
        const url = service.buildResourceUrl('Patient');
        expect(url).toContain('/patient-service/fhir/Patient');
      });

      it('should build URL for Patient read with id', () => {
        const url = service.buildResourceUrl('Patient', '123');
        expect(url).toContain('/patient-service/fhir/Patient/123');
      });

      it('should build URL for Organization search', () => {
        const url = service.buildResourceUrl('Organization');
        expect(url).toContain('/organization-service/fhir/Organization');
      });

      it('should build URL for Task read with id', () => {
        const url = service.buildResourceUrl('Task', 'task-456');
        expect(url).toContain('/task-service/fhir/Task/task-456');
      });
    });

    describe('buildPaginationUrl', () => {
      it('should build pagination URL for Patient', () => {
        const url = service.buildPaginationUrl('Patient', '?_getpages=abc123');
        expect(url).toContain('/patient-service/fhir?_getpages=abc123');
      });

      it('should build pagination URL for Organization', () => {
        const url = service.buildPaginationUrl('Organization', '?_getpages=xyz789');
        expect(url).toContain('/organization-service/fhir?_getpages=xyz789');
      });
    });
  });

  describe('with single-server config', () => {
    let service: FhirEndpointResolverService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          FhirEndpointResolverService,
          { provide: FHIR_ENDPOINT_CONFIG, useValue: DEFAULT_SINGLE_SERVER_CONFIG }
        ]
      });
      service = TestBed.inject(FhirEndpointResolverService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('getBasePath', () => {
      it('should return single server path for all resource types', () => {
        expect(service.getBasePath('Patient')).toBe('/fhir');
        expect(service.getBasePath('Appointment')).toBe('/fhir');
        expect(service.getBasePath('Communication')).toBe('/fhir');
        expect(service.getBasePath('Organization')).toBe('/fhir');
        expect(service.getBasePath('CareTeam')).toBe('/fhir');
        expect(service.getBasePath('EpisodeOfCare')).toBe('/fhir');
        expect(service.getBasePath('Task')).toBe('/fhir');
      });
    });

    describe('buildResourceUrl', () => {
      it('should build URL with single server path for Patient', () => {
        const url = service.buildResourceUrl('Patient');
        expect(url).toContain('/fhir/Patient');
        expect(url).not.toContain('patient-service');
      });

      it('should build URL with single server path for Organization', () => {
        const url = service.buildResourceUrl('Organization', 'org-1');
        expect(url).toContain('/fhir/Organization/org-1');
        expect(url).not.toContain('organization-service');
      });
    });

    describe('buildPaginationUrl', () => {
      it('should build pagination URL with single server path', () => {
        const url = service.buildPaginationUrl('Patient', '?_getpages=abc123');
        expect(url).toContain('/fhir?_getpages=abc123');
        expect(url).not.toContain('patient-service');
      });
    });
  });

  describe('with custom config', () => {
    let service: FhirEndpointResolverService;

    const customConfig: FhirEndpointConfig = {
      mode: 'single',
      singleServerPath: '/custom/fhir/r4'
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          FhirEndpointResolverService,
          { provide: FHIR_ENDPOINT_CONFIG, useValue: customConfig }
        ]
      });
      service = TestBed.inject(FhirEndpointResolverService);
    });

    it('should use custom single server path', () => {
      expect(service.getBasePath('Patient')).toBe('/custom/fhir/r4');
      expect(service.buildResourceUrl('Patient', '123')).toContain('/custom/fhir/r4/Patient/123');
    });
  });

  describe('with no config provided', () => {
    let service: FhirEndpointResolverService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [FhirEndpointResolverService]
      });
      service = TestBed.inject(FhirEndpointResolverService);
    });

    it('should fall back to multi-server config', () => {
      expect(service.getBasePath('Patient')).toBe('/patient-service/fhir');
      expect(service.getBasePath('Organization')).toBe('/organization-service/fhir');
    });
  });
});
