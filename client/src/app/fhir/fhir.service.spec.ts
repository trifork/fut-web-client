import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FhirService } from './fhir.service';

describe('FhirService', () => {
  let service: FhirService;
  let httpMock: HttpTestingController;

  const mockPatientBundle: fhir.Bundle = {
    resourceType: 'Bundle',
    type: 'searchset',
    total: 1,
    link: [
      { relation: 'self', url: 'http://example.com/Patient' }
    ],
    entry: [
      {
        resource: {
          resourceType: 'Patient',
          id: 'patient-1',
          name: [{ family: 'Doe', given: ['John'], use: 'official' }],
          gender: 'male',
          birthDate: '1990-01-01'
        } as fhir.Patient
      }
    ]
  };

  const mockPatient: fhir.Patient = {
    resourceType: 'Patient',
    id: 'patient-1',
    name: [{ family: 'Doe', given: ['John'], use: 'official' }],
    gender: 'male',
    birthDate: '1990-01-01'
  };

  const mockAppointment: fhir.Appointment = {
    resourceType: 'Appointment',
    id: 'appointment-1',
    status: 'booked',
    start: '2024-01-01T10:00:00Z',
    end: '2024-01-01T11:00:00Z',
    participant: []
  };

  const mockOrganization: fhir.Organization = {
    resourceType: 'Organization',
    id: 'org-1',
    name: 'Test Organization'
  };

  const mockCareTeam: fhir.CareTeam = {
    resourceType: 'CareTeam',
    id: 'team-1',
    name: 'Test Care Team',
    status: 'active'
  };

  const mockTask: fhir.Task = {
    resourceType: 'Task',
    id: 'task-1',
    status: 'requested',
    intent: 'order'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FhirService]
    });

    service = TestBed.inject(FhirService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Patient operations', () => {
    it('should search patients', () => {
      service.searchPatients().subscribe(bundle => {
        expect(bundle).toBeTruthy();
        expect(bundle.resourceType).toBe('Bundle');
        expect(bundle.entry?.length).toBe(1);
      });

      const req = httpMock.expectOne(req => req.url.includes('/patient-service/fhir/Patient'));
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('_count')).toBe('15');
      expect(req.request.params.get('_sort')).toBe('family,given');
      req.flush(mockPatientBundle);
    });

    it('should read a patient by id', () => {
      service.readPatient('patient-1').subscribe(patient => {
        expect(patient).toBeTruthy();
        expect(patient.id).toBe('patient-1');
        expect(patient.resourceType).toBe('Patient');
      });

      const req = httpMock.expectOne(req => req.url.includes('/patient-service/fhir/Patient/patient-1'));
      expect(req.request.method).toBe('GET');
      req.flush(mockPatient);
    });
  });

  describe('Appointment operations', () => {
    it('should search appointments', () => {
      const mockBundle: fhir.Bundle = {
        resourceType: 'Bundle',
        type: 'searchset',
        total: 1,
        link: [],
        entry: [{ resource: mockAppointment }]
      };

      service.searchAppointment().subscribe(bundle => {
        expect(bundle).toBeTruthy();
        expect(bundle.entry?.length).toBe(1);
      });

      const req = httpMock.expectOne(req => req.url.includes('/patient-service/fhir/Appointment'));
      expect(req.request.method).toBe('GET');
      req.flush(mockBundle);
    });

    it('should read an appointment by id', () => {
      service.readAppointment('appointment-1').subscribe(appointment => {
        expect(appointment).toBeTruthy();
        expect(appointment.id).toBe('appointment-1');
        expect(appointment.status).toBe('booked');
      });

      const req = httpMock.expectOne(req => req.url.includes('/patient-service/fhir/Appointment/appointment-1'));
      expect(req.request.method).toBe('GET');
      req.flush(mockAppointment);
    });
  });

  describe('Organization operations', () => {
    it('should search organizations', () => {
      const mockBundle: fhir.Bundle = {
        resourceType: 'Bundle',
        type: 'searchset',
        total: 1,
        link: [],
        entry: [{ resource: mockOrganization }]
      };

      service.searchOrganization().subscribe(bundle => {
        expect(bundle).toBeTruthy();
        expect(bundle.entry?.length).toBe(1);
      });

      const req = httpMock.expectOne(req => req.url.includes('/organization-service/fhir/Organization'));
      expect(req.request.method).toBe('GET');
      req.flush(mockBundle);
    });

    it('should read an organization by id', () => {
      service.readOrganization('org-1').subscribe(org => {
        expect(org).toBeTruthy();
        expect(org.id).toBe('org-1');
        expect(org.name).toBe('Test Organization');
      });

      const req = httpMock.expectOne(req => req.url.includes('/organization-service/fhir/Organization/org-1'));
      expect(req.request.method).toBe('GET');
      req.flush(mockOrganization);
    });
  });

  describe('CareTeam operations', () => {
    it('should search care teams', () => {
      const mockBundle: fhir.Bundle = {
        resourceType: 'Bundle',
        type: 'searchset',
        total: 1,
        link: [],
        entry: [{ resource: mockCareTeam }]
      };

      service.searchCareTeam().subscribe(bundle => {
        expect(bundle).toBeTruthy();
        expect(bundle.entry?.length).toBe(1);
      });

      const req = httpMock.expectOne(req => req.url.includes('/organization-service/fhir/CareTeam'));
      expect(req.request.method).toBe('GET');
      req.flush(mockBundle);
    });

    it('should read a care team by id', () => {
      service.readCareTeam('team-1').subscribe(team => {
        expect(team).toBeTruthy();
        expect(team.id).toBe('team-1');
        expect(team.name).toBe('Test Care Team');
      });

      const req = httpMock.expectOne(req => req.url.includes('/organization-service/fhir/CareTeam/team-1'));
      expect(req.request.method).toBe('GET');
      req.flush(mockCareTeam);
    });
  });

  describe('EpisodeOfCare operations', () => {
    it('should search episodes of care with team filter', () => {
      const mockEoc: fhir.EpisodeOfCare = {
        resourceType: 'EpisodeOfCare',
        id: 'eoc-1',
        status: 'active',
        patient: { reference: 'Patient/patient-1' }
      };
      const mockBundle: fhir.Bundle = {
        resourceType: 'Bundle',
        type: 'searchset',
        total: 1,
        link: [],
        entry: [{ resource: mockEoc }]
      };

      service.searchEpisodeOfCare('team-1').subscribe(bundle => {
        expect(bundle).toBeTruthy();
        expect(bundle.entry?.length).toBe(1);
      });

      const req = httpMock.expectOne(req => req.url.includes('/care-plan-service/fhir/EpisodeOfCare'));
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('team')).toBe('team-1');
      req.flush(mockBundle);
    });

    it('should search episodes of care without team filter', () => {
      const mockBundle: fhir.Bundle = {
        resourceType: 'Bundle',
        type: 'searchset',
        total: 0,
        link: [],
        entry: []
      };

      service.searchEpisodeOfCare(null).subscribe(bundle => {
        expect(bundle).toBeTruthy();
      });

      const req = httpMock.expectOne(req => req.url.includes('/care-plan-service/fhir/EpisodeOfCare'));
      expect(req.request.method).toBe('GET');
      expect(req.request.params.has('team')).toBeFalse();
      req.flush(mockBundle);
    });
  });

  describe('Task operations', () => {
    it('should search tasks with responsible filter', () => {
      const mockBundle: fhir.Bundle = {
        resourceType: 'Bundle',
        type: 'searchset',
        total: 1,
        link: [],
        entry: [{ resource: mockTask }]
      };

      service.searchTask('team-1').subscribe(bundle => {
        expect(bundle).toBeTruthy();
        expect(bundle.entry?.length).toBe(1);
      });

      const req = httpMock.expectOne(req => req.url.includes('/task-service/fhir/Task'));
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('responsible')).toBe('team-1');
      req.flush(mockBundle);
    });

    it('should read a task by id', () => {
      service.readTask('task-1').subscribe(task => {
        expect(task).toBeTruthy();
        expect(task.id).toBe('task-1');
        expect(task.status).toBe('requested');
      });

      const req = httpMock.expectOne(req => req.url.includes('/task-service/fhir/Task/task-1'));
      expect(req.request.method).toBe('GET');
      req.flush(mockTask);
    });
  });

  describe('Pagination', () => {
    it('should get next page', () => {
      const mockLink: fhir.BundleLink = {
        relation: 'next',
        url: 'http://example.com/fhir?_getpages=abc123'
      };
      const mockBundle: fhir.Bundle = {
        resourceType: 'Bundle',
        type: 'searchset',
        total: 0,
        link: [],
        entry: []
      };

      service.getPage(mockLink, 'patient-service').subscribe(bundle => {
        expect(bundle).toBeTruthy();
      });

      const req = httpMock.expectOne(req => req.url.includes('/patient-service/fhir?_getpages=abc123'));
      expect(req.request.method).toBe('GET');
      req.flush(mockBundle);
    });
  });
});
