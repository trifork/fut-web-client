import { TestBed } from '@angular/core/testing';

import { FhirService } from './fhir.service';

describe('FhirService', () => {
  let service: FhirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FhirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
