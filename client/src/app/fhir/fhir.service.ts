import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FhirEndpointResolverService} from './fhir-endpoint-resolver.service';
import {FhirResourceType} from './fhir-endpoint.config';
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

  constructor(
    private readonly http: HttpClient,
    private readonly endpointResolver: FhirEndpointResolverService
  ) {
  }

  public readPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(
      this.endpointResolver.buildResourceUrl('Patient', id),
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

    return this.http.get<Bundle>(this.endpointResolver.buildResourceUrl('Patient'),
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
      this.endpointResolver.buildResourceUrl('Communication'),
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
      this.endpointResolver.buildResourceUrl('Appointment'),
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
      this.endpointResolver.buildResourceUrl('Organization'),
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
      this.endpointResolver.buildResourceUrl('CareTeam'),
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
      this.endpointResolver.buildResourceUrl('EpisodeOfCare'),
      {params, observe: 'body'}
    );
  }


  public getPage(link: fhir.BundleLink, resourceType: FhirResourceType): Observable<Bundle> {
    const query = link.url.substr(link.url.lastIndexOf('?_getpages'));
    const url = this.endpointResolver.buildPaginationUrl(resourceType, query);
    return this.http.get<Bundle>(url, {observe: 'body'});
  }

  readAppointment(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(
      this.endpointResolver.buildResourceUrl('Appointment', id),
      {
        observe: 'body'
      });
  }

  readMessage(id: string): Observable<Communication> {
    return this.http.get<Communication>(
      this.endpointResolver.buildResourceUrl('Communication', id),
      {
        observe: 'body'
      });
  }

  readEpisodeOfCare(id: string): Observable<EpisodeOfCare> {
    return this.http.get<EpisodeOfCare>(
      this.endpointResolver.buildResourceUrl('EpisodeOfCare', id),
      {
        observe: 'body'
      });
  }

  readOrganization(id: string): Observable<Organization> {
    return this.http.get<Organization>(
      this.endpointResolver.buildResourceUrl('Organization', id),
      {
        observe: 'body'
      });
  }

  readCareTeam(id: string): Observable<CareTeam> {
    return this.http.get<CareTeam>(
      this.endpointResolver.buildResourceUrl('CareTeam', id),
      {
        observe: 'body'
      });
  }

  public readTask(id: string): Observable<Task> {
    return this.http.get<Task>(
      this.endpointResolver.buildResourceUrl('Task', id),
      {
        responseType: 'json',
        observe: 'body'
      });
  }

  public searchTask(team: string): Observable<Bundle> {
    const params = (team != null ? new HttpParams().set('responsible', team) : new HttpParams())
      .set('_count', '15');

    return this.http.get<Bundle>(this.endpointResolver.buildResourceUrl('Task'),
      {
        params,
        responseType: 'json',
        observe: 'body'
      }
    );
  }
}
