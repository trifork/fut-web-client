import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FhirService} from '../../fhir.service';
import {LoadingService} from '../../../spinner/loading.service';
import {MatDialog} from "@angular/material/dialog";
import {FhirPatientDetailModalComponent} from "../patient-detail-modal/fhir-patient-detail-modal.component";
import Bundle = fhir.Bundle;
import Patient = fhir.Patient;
import BundleLink = fhir.BundleLink;
import {UserService} from '../../../user/user.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'fhir-patient-search',
  templateUrl: './fhir-patient-search.component.html',
  styleUrls: ['./fhir-patient-search.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class FhirPatientSearchComponent {



  bundle = new BehaviorSubject<Bundle>(null);
  rows$: Observable<PatientRow[]>;
  displayedColumns = ['id', 'name', 'cpr', 'gender', 'date', 'address', 'details'];
  next: BundleLink;
  previous: BundleLink;


  isExpansionDetailRow = (i: number, row: object) => row.hasOwnProperty('detailRow');

  constructor(private fhir: FhirService, public loadingService: LoadingService, public dialog: MatDialog, public userService: UserService) {
  }

  private static toPatientRow(patient: fhir.Patient): PatientRow {
    const name = patient.name.filter(n => n.use === 'official')[0];
    const address = patient?.address?.filter(a => a.use === 'home')[0];

    return new PatientRow(
      patient.id,
      name.family + ', ' + name.given.join(' '),
      patient.identifier.filter(i => i.use === 'official').filter(i => i.system === 'urn:oid:1.2.208.176.1.2')[0].value,
      patient.gender,
      patient.birthDate,
      address?.line.join(' ') + ', ' + address?.postalCode + ' ' + address?.city + ', ' + address?.country,
      !!patient.deceasedBoolean,
      false,
      patient
    );
  }

  addPatientToContext(pat: PatientRow): void {
    this.userService.addPatientToContext('https://patient.' + environment.baseUrl + '/fhir/Patient/' + pat.id);
  }

  search(): void {
    this.fhir.searchPatients().subscribe(bundle => this.bundle.next(bundle));

    this.rows$ = this.bundle
      .pipe(map(bundle => {

        if (!bundle) {
          return [];
        }
        const entries = bundle.entry;
        const rows = [];

        entries.forEach(entry => {
            const element = FhirPatientSearchComponent.toPatientRow(entry.resource as Patient);
            rows.push(element);
          }
        );
        return rows;
      }));

    this.bundle.subscribe(
      bundle => {
        if (bundle) {
          this.next = bundle.link.filter(link => link.relation === 'next').pop();
          this.previous = bundle.link.filter(link => link.relation === 'previous').pop();
        }
      }
    );
  }

  loadNext(): void {
    this.fhir.getPage(this.next, 'patient-service').subscribe(b => this.bundle.next(b));
  }

  loadPrevious(): void {
    this.fhir.getPage(this.previous, 'patient-service').subscribe(b => this.bundle.next(b));
  }

  openDialog(resource: Patient) {
    this.dialog.open(FhirPatientDetailModalComponent, {
      data: {patient: resource},
      position: {right: '0'}
    });
  }

}

class PatientRow {
  id: string;
  name: string;
  cpr: string;
  gender: string;
  date: string;
  address: string;
  deceased: boolean;
  expanded: boolean;
  resource: Patient;

  constructor(id: string, name: string, cpr: string, gender: string, dateOfBirth: string,
              address: string, deceased: boolean, expanded: boolean, resource: Patient) {
    this.id = id;
    this.name = name;
    this.cpr = cpr;
    this.gender = gender;
    this.date = dateOfBirth;
    this.address = address;
    this.deceased = deceased;
    this.expanded = expanded;
    this.resource = resource;
  }
}
