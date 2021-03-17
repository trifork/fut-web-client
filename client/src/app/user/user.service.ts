import {Injectable} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakInstance} from 'keycloak-js';
import {AvailableContext} from './model/available-context';
import {HttpClient} from '@angular/common/http';
import {EHealthContext} from './model/ehealth-context';
import {UserProfile} from './model/user-profile';
import {BehaviorSubject} from 'rxjs';
import {LocalStorageService} from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private availableContext = new BehaviorSubject<AvailableContext>(null);
  private currentContext = new BehaviorSubject<EHealthContext>(null);
  private userProfile = new BehaviorSubject<UserProfile>(null);

  public availableContext$ = this.availableContext.asObservable();
  public currentContext$ = this.currentContext.asObservable();
  public userProfile$ = this.userProfile.asObservable();

  private keycloakInstance: MyKeycloakInstance;

  constructor(private keycloakService: KeycloakService, private http: HttpClient, private store: LocalStorageService) {
    this.keycloakInstance = keycloakService.getKeycloakInstance() as MyKeycloakInstance;

    const ctx = store.getItem<EHealthContext>('ctx');
    console.log(ctx);
    if (ctx) {
      this.setContext(ctx.organization, ctx.careTeam, ctx.patient, ctx.episodeOfCare);
    }
    this.setAvailableContexts();
    this.setUserProfile();
  }

  public isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  setAvailableContexts(): void {
    if (!this.isLoggedIn()) {
      this.availableContext.next(null);
      return;
    }

    this.http.get<AvailableContext>(this.keycloakInstance.authServerUrl + '/realms/' + this.keycloakInstance.realm + '/resource/ehealth-connect/contexts',
      {
        observe: 'body',
        responseType: 'json'
      })
      .subscribe(data => {
        this.availableContext.next(data);
      });
  }

  public async setContext(organization: string, careTeam: string, patient?: string, episodeOfCare?: string): Promise<void> {
    if (await this.isLoggedIn()) {
      this.keycloakInstance.setContext(organization, careTeam, patient, episodeOfCare);
      this.keycloakInstance.updateToken(-1)
        .then(() => this.update());
    }
  }

  async setCurrentContext(): Promise<void> {
    if (!(await this.isLoggedIn())) {
      this.currentContext.next(null);
      this.store.removeItem('ctx');
      return;
    }

    const ctx = this.keycloakInstance.tokenParsed['context'];
    if (ctx) {
      let eHealthContext = new EHealthContext(
        ctx['care_team_id'],
        ctx['organization_id'],
        ctx['patient_id'],
        ctx['episode_of_care_id']
      );
      this.currentContext.next(eHealthContext);
      this.store.setItem('ctx', eHealthContext);
    } else {
      this.currentContext.next(null);
      this.store.removeItem('ctx');
    }
  }

  async setUserProfile(): Promise<void> {
    if (!(await this.isLoggedIn())) {
      this.userProfile.next(null);
      return;
    }

    const token = this.keycloakInstance.tokenParsed;

    const profile = new UserProfile();
    profile.id = token['user_id'];
    profile.name = token['name'];
    profile.type = token['user_type'];
    profile.roles = token.realm_access.roles;

    profile.url = this.keycloakInstance.createAccountUrl();

    this.userProfile.next(profile);
  }

  public update(): void {
    this.setUserProfile();
    this.setAvailableContexts();
    this.setCurrentContext();
  }

  public login(): void {
    this.store.removeItem('ctx');

    this.keycloakService.login()
      .then(this.update);
  }

  public logout(): void {
    this.keycloakService.logout()
      .then(this.update);
    this.store.removeItem('ctx');
  }

  public isUserInRole(role: string): boolean {
    return this.keycloakService.isUserInRole(role);
  }

  addPatientToContext(patient: string): void {
    // console.info('addPatientToContext ', patient);
    const ctx = this.currentContext.getValue();
    this.setContext(ctx?.organization, ctx?.careTeam, patient);
  }

  addEpisodeOfCareToContext(eoc: string): void {
    // console.info('addEpisodeOfCareToContext ', eoc);
    const ctx = this.currentContext.getValue();
    this.setContext(ctx?.organization, ctx?.careTeam, null, eoc);
  }
}

interface MyKeycloakInstance extends KeycloakInstance {
  setContext(organization: string, careTeam: string, patient: string, episodeOfCare: string): void;
}
