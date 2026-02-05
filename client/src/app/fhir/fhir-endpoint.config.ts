import {InjectionToken} from '@angular/core';

export type FhirResourceType =
  | 'Patient'
  | 'Appointment'
  | 'Communication'
  | 'Organization'
  | 'CareTeam'
  | 'EpisodeOfCare'
  | 'Task';

export interface SingleServerConfig {
  mode: 'single';
  singleServerPath: string;
}

export interface MultiServerConfig {
  mode: 'multi';
  resourceEndpoints: Record<FhirResourceType, string>;
}

export type FhirEndpointConfig = SingleServerConfig | MultiServerConfig;

export const FHIR_ENDPOINT_CONFIG = new InjectionToken<FhirEndpointConfig>('FHIR_ENDPOINT_CONFIG');

export const DEFAULT_SINGLE_SERVER_CONFIG: SingleServerConfig = {
  mode: 'single',
  singleServerPath: '/fhir'
};

export const DEFAULT_MULTI_SERVER_CONFIG: MultiServerConfig = {
  mode: 'multi',
  resourceEndpoints: {
    Patient: '/patient-service/fhir',
    Appointment: '/patient-service/fhir',
    Communication: '/patient-service/fhir',
    Organization: '/organization-service/fhir',
    CareTeam: '/organization-service/fhir',
    EpisodeOfCare: '/care-plan-service/fhir',
    Task: '/task-service/fhir'
  }
};
