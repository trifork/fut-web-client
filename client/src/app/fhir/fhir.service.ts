import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseUrl} from '../app-routing/base-url';
import {map} from 'rxjs/operators';
import Patient = fhir.Patient;
import Bundle = fhir.Bundle;
import Appointment = fhir.Appointment;
import Communication = fhir.Communication;
import EpisodeOfCare = fhir.EpisodeOfCare;
import Organization = fhir.Organization;
import CareTeam = fhir.CareTeam;
import Task = fhir.Task;

@Injectable({
  providedIn: 'root'
})
export class FhirService {

  constructor(private readonly http: HttpClient) {
  }

  public readPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(
      BaseUrl.get() + '/patient-service/fhir/Patient/' + id,
      {
        observe: 'response'
      })
      .pipe(map(response => {
        response.headers.keys().forEach(k => console.log(k + ': ' + response.headers.get(k)));
        return response.body;
      }));
  }

  public searchPatients(): Observable<Bundle> {
    const params = new HttpParams()
      .set('_count', '15')
      .set('_sort', 'family,given');

    return this.http.get<Bundle>(BaseUrl.get() + '/patient-service/fhir/Patient',
      {
        params,
        responseType: 'json',
        observe: 'body'
      }
    );
  }

  public searchMessages(): Observable<Bundle> {
    const httpParams = new HttpParams()
      .set('_count', '15');

    return this.http.get<Bundle>(
      BaseUrl.get() + '/patient-service/fhir/Communication',
      {
        params: httpParams,
        observe: 'response'
      })
      .pipe(map(response => {
        response.headers.keys().forEach(k => console.log(k + ': ' + response.headers.get(k)));
        return response.body;
      }));
  }

  public searchAppointment(): Observable<Bundle> {
    const params = new HttpParams()
      .set('_count', '15');

    return this.http.get<Bundle>(
      BaseUrl.get() + '/patient-service/fhir/Appointment',
      {
        params,
        observe: 'response'
      })
      .pipe(map(response => {
        response.headers.keys().forEach(k => console.log(k + ': ' + response.headers.get(k)));
        return response.body;
      }));
  }

  public searchOrganization(): Observable<Bundle> {
    const params = new HttpParams()
      .set('_count', '15');
    return this.http.get<Bundle>(
      BaseUrl.get() + '/organization-service/fhir/Organization',
      {
        params,
        observe: 'body'
      }
    );
  }

  public searchCareTeam(): Observable<Bundle> {
    const params = new HttpParams()
      .set('_count', '15');

    return this.http.get<Bundle>(
      BaseUrl.get() + '/organization-service/fhir/CareTeam',
      {
        params,
        observe: 'body'
      }
    );
  }

  public searchEpisodeOfCare(team: string): Observable<Bundle> {
    const params = (team != null ? new HttpParams().set('team', team) : new HttpParams())
      .set('_count', '15');

    return this.http.get<Bundle>(
      BaseUrl.get() + '/care-plan-service/fhir/EpisodeOfCare',
      {params, observe: 'body'}
    );
  }


  public getPage(link: fhir.BundleLink, service: string): Observable<Bundle> {
    const query = link.url.substr(link.url.lastIndexOf('?_getpages'));
    const url = BaseUrl.get() + '/' + service + '/fhir' + query;
    return this.http.get<Bundle>(url, {observe: 'body'});
  }

  readAppointment(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(
      BaseUrl.get() + '/patient-service/fhir/Appointment/' + id,
      {
        observe: 'body'
      });
  }

  readMessage(id: string): Observable<Communication> {
    return this.http.get<Communication>(
      BaseUrl.get() + '/patient-service/fhir/Communication/' + id,
      {
        observe: 'body'
      });
  }

  readEpisodeOfCare(id: string): Observable<EpisodeOfCare> {
    return this.http.get<EpisodeOfCare>(
      BaseUrl.get() + '/care-plan-service/fhir/EpisodeOfCare/' + id,
      {
        observe: 'body'
      });
  }

  readOrganization(id: string): Observable<Organization> {
    return this.http.get<Organization>(
      BaseUrl.get() + '/organization-service/fhir/Organization/' + id,
      {
        observe: 'body'
      });
  }

  readCareTeam(id: string): Observable<CareTeam> {
    return this.http.get<CareTeam>(
      BaseUrl.get() + '/organization-service/fhir/CareTeam/' + id,
      {
        observe: 'body'
      });
  }

  public readTask(id: string): Observable<Task> {
    return this.http.get<Task>(
      BaseUrl.get() + '/task-service/fhir/Task/' + id,
      {
        responseType: 'json',
        observe: 'body'
      });
  }

  public searchTask(team: string): Observable<Bundle> {
    const params = (team != null ? new HttpParams().set('responsible', team) : new HttpParams())
      .set('_count', '15');

    return this.http.get<Bundle>(BaseUrl.get() + '/task-service/fhir/Task',
      {
        params,
        responseType: 'json',
        observe: 'body'
      }
    );
  }
}
