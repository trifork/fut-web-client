import {environment} from '../environments/environment';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

import {MatIconModule} from '@angular/material/icon';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {AvailableContextComponent} from './user/available-context/available-context.component';
import {UserProfileComponent} from './user/user-profile/user-profile.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {FhirOrganizationPageComponent} from './fhir/organization/organization-page/fhir-organization-page.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {UserControlComponent} from './user/user-control/user-control.component';
import {FhirAddressesComponent} from './fhir/address/fhir-addresses.component';
import {FhirIdentifiersComponent} from './fhir/identifier/fhir-identifiers.component';
import {FhirContactPointsComponent} from './fhir/contact-point/fhir-contact-points.component';
import {FhirCodingComponent} from './fhir/terminology/coding/fhir-coding.component';
import {FhirCodeableConeptComponent} from './fhir/terminology/codeable-conept/fhir-codeable-conept.component';
import {FhirCareTeamPageComponent} from './fhir/care-team/care-team-page/fhir-care-team-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FhirPatientSearchComponent} from './fhir/patient/patient-search/fhir-patient-search.component';
import {FhirEpisodeOfCareSearchComponent} from './fhir/episode-of-care/episode-of-care-search/fhir-episode-of-care-search.component';
import {MatTableModule} from '@angular/material/table';
import {FhirPatientFullComponent} from './fhir/patient/patient-full/fhir-patient-full.component';
import {FhirPatientPageComponent} from './fhir/patient/patient-page/fhir-patient-page.component';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {FhirMessageSearchComponent} from './fhir/communication/message/message-search/fhir-message-search.component';
import {FhirAppointmentSearchComponent} from './fhir/appointment/appointment-search/fhir-appointment-search.component';
import {FhirOrganizationSearchComponent} from './fhir/organization/organization-search/fhir-organization-search.component';
import {FhirCareTeamSearchComponent} from './fhir/care-team/care-team-search/fhir-care-team-search.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FhirPatientDetailComponent} from './fhir/patient/patient-detail/fhir-patient-detail.component';
import {NotificationService} from './notification/notification.service';
import {NotifyingErrorHandler} from './notification/notifying.error-handler';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {LoadingInterceptor} from './spinner/loading.interceptor';
import {LoadingService} from './spinner/loading.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FhirAppointmentDetailComponent} from './fhir/appointment/appointment-detail/fhir-appointment-detail.component';
import {FhirAppointmentDetailModalComponent} from './fhir/appointment/appointment-detail-modal/fhir-appointment-detail-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ContextBarComponent} from './context-bar/context-bar.component';
import {FhirAppointmentPageComponent} from './fhir/appointment/appointment-page/fhir-appointment-page.component';
import {FhirMessagePageComponent} from './fhir/communication/message/message-page/fhir-message-page.component';
import {FhirMessageDetailComponent} from './fhir/communication/message/message-detail/fhir-message-detail.component';
import {FhirEpisodeOfCareDetailComponent} from './fhir/episode-of-care/episode-of-care-detail/fhir-episode-of-care-detail.component';
import {FhirEpisodeOfCarePageComponent} from './fhir/episode-of-care/episode-of-care-page/fhir-episode-of-care-page.component';
import {FhirEpisodeOfCareDetailModalComponent} from './fhir/episode-of-care/episode-of-care-detail-modal/fhir-episode-of-care-detail-modal.component';
import {FhirPatientDetailModalComponent} from './fhir/patient/patient-detail-modal/fhir-patient-detail-modal.component';
import {FhirOrganizationDetailModalComponent} from './fhir/organization/organization-detail-modal/fhir-organization-detail-modal.component';
import {FhirOrganizationDetailComponent} from './fhir/organization/organization-detail/fhir-organization-detail.component';
import {FhirCareTeamDetailComponent} from './fhir/care-team/care-team-detail/fhir-care-team-detail.component';
import {FhirCareTeamDetailModalComponent} from './fhir/care-team/care-team-detail-modal/fhir-care-team-detail-modal.component';
import {FhirMessageDetailModalComponent} from './fhir/communication/message/message-detail-modal/fhir-message-detail-modal.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {TaskSearchComponent} from "./fhir/task/task-search/task-search.component";
import {TaskDetailComponent} from "./fhir/task/task-detail/task-detail.component";
import {TaskDetailModalComponent} from "./fhir/task/task-detail-modal/task-detail-modal.component";
import {TaskPageComponent} from "./fhir/task/task-page/task-page.component";


function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return () => keycloak.init({
    config: {
      url: 'https://saml.' + environment.baseUrl + '/auth',
      realm: 'ehealth',
      clientId: 'oio_mock',
    }, initOptions: {
      onLoad: 'login-required',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
    }
  });
}

@NgModule({
  declarations: [
    AppComponent,
    AvailableContextComponent,
    UserProfileComponent,
    FhirOrganizationPageComponent,
    UserControlComponent,
    FhirAddressesComponent,
    FhirIdentifiersComponent,
    FhirContactPointsComponent,
    FhirCodingComponent,
    FhirCodeableConeptComponent,
    FhirCareTeamPageComponent,
    FhirPatientSearchComponent,
    FhirEpisodeOfCareSearchComponent,
    FhirPatientFullComponent,
    FhirPatientPageComponent,
    FhirMessageSearchComponent,
    FhirAppointmentSearchComponent,
    FhirOrganizationSearchComponent,
    FhirCareTeamSearchComponent,
    FhirPatientDetailComponent,
    FhirAppointmentDetailComponent,
    FhirAppointmentDetailModalComponent,
    ContextBarComponent,
    FhirAppointmentPageComponent,
    FhirMessagePageComponent,
    FhirMessageDetailComponent,
    FhirEpisodeOfCareDetailComponent,
    FhirEpisodeOfCarePageComponent,
    FhirEpisodeOfCareDetailModalComponent,
    FhirPatientDetailModalComponent,
    FhirOrganizationDetailModalComponent,
    FhirOrganizationDetailComponent,
    FhirCareTeamDetailComponent,
    FhirCareTeamDetailModalComponent,
    FhirMessageDetailModalComponent,
    TaskSearchComponent,
    TaskDetailComponent,
    TaskDetailModalComponent,
    TaskPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    KeycloakAngularModule,
    HttpClientModule,
    AppRoutingModule,
    NgxJsonViewerModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    {provide: NotificationService, useClass: NotificationService},
    {provide: LoadingService, useClass: LoadingService},
    {provide: ErrorHandler, useClass: NotifyingErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: NoCacheInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
