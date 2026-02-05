export const environment = {
  production: true,
  fhirEndpoint: {
    mode: 'multi' as const,
    resourceEndpoints: {
      Patient: '/patient-service/fhir',
      Appointment: '/patient-service/fhir',
      Communication: '/patient-service/fhir',
      Organization: '/organization-service/fhir',
      CareTeam: '/organization-service/fhir',
      EpisodeOfCare: '/care-plan-service/fhir',
      Task: '/task-service/fhir'
    }
  }
};
