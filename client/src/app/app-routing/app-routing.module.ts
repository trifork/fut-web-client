import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FhirOrganizationPageComponent} from '../fhir/organization/organization-page/fhir-organization-page.component';
import {FhirCareTeamPageComponent} from '../fhir/care-team/care-team-page/fhir-care-team-page.component';
import {FhirPatientSearchComponent} from '../fhir/patient/patient-search/fhir-patient-search.component';
import {FhirEpisodeOfCareSearchComponent} from '../fhir/episode-of-care/episode-of-care-search/fhir-episode-of-care-search.component';
import {FhirPatientPageComponent} from '../fhir/patient/patient-page/fhir-patient-page.component';
import {FhirMessageSearchComponent} from '../fhir/communication/message/message-search/fhir-message-search.component';
import {FhirAppointmentSearchComponent} from '../fhir/appointment/appointment-search/fhir-appointment-search.component';
import {FhirOrganizationSearchComponent} from '../fhir/organization/organization-search/fhir-organization-search.component';
import {FhirCareTeamSearchComponent} from '../fhir/care-team/care-team-search/fhir-care-team-search.component';
import {FhirAppointmentPageComponent} from '../fhir/appointment/appointment-page/fhir-appointment-page.component';
import {FhirMessagePageComponent} from '../fhir/communication/message/message-page/fhir-message-page.component';
import {FhirEpisodeOfCarePageComponent} from '../fhir/episode-of-care/episode-of-care-page/fhir-episode-of-care-page.component';
import {UserProfileComponent} from '../user/user-profile/user-profile.component';

const routes: Routes = [
  {path: '', component: UserProfileComponent},
  {path: 'Organization', component: FhirOrganizationSearchComponent},
  {path: 'Organization/:id', component: FhirOrganizationPageComponent},
  {path: 'CareTeam', component: FhirCareTeamSearchComponent},
  {path: 'CareTeam/:id', component: FhirCareTeamPageComponent},
  {path: 'Patient', component: FhirPatientSearchComponent},
  {path: 'Patient/:id', component: FhirPatientPageComponent},
  {path: 'EpisodeOfCare', component: FhirEpisodeOfCareSearchComponent},
  {path: 'EpisodeOfCare/:id', component: FhirEpisodeOfCarePageComponent},
  {path: 'Message', component: FhirMessageSearchComponent},
  {path: 'Message/:id', component: FhirMessagePageComponent},
  {path: 'Appointment', component: FhirAppointmentSearchComponent},
  {path: 'Appointment/:id', component: FhirAppointmentPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
