import {Component} from '@angular/core';
import {FhirService} from '../../fhir.service';
import {BehaviorSubject, Observable} from "rxjs";
import {LoadingService} from "../../../spinner/loading.service";
import {map} from "rxjs/operators";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatDialog} from "@angular/material/dialog";
import {FhirAppointmentDetailModalComponent} from "../appointment-detail-modal/fhir-appointment-detail-modal.component";
import Bundle = fhir.Bundle;
import BundleLink = fhir.BundleLink;
import Appointment = fhir.Appointment;

@Component({
  selector: 'fhir-appointment-search',
  templateUrl: './fhir-appointment-search.component.html',
  styleUrls: ['./fhir-appointment-search.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class FhirAppointmentSearchComponent {

  bundle = new BehaviorSubject<Bundle>(null);
  rows$: Observable<AppointmentRow[]>;
  displayedColumns = ['id', 'description', 'start', 'end', 'status', 'details'];
  next: BundleLink;
  previous: BundleLink;


  isExpansionDetailRow = (i: number, row: object) => row.hasOwnProperty('detailRow');

  constructor(private fhir: FhirService, public loadingService: LoadingService, public dialog: MatDialog) {
  }

  search(): void {
    this.fhir.searchAppointment().subscribe(bundle => this.bundle.next(bundle));

    this.rows$ = this.bundle
      .pipe(map(bundle => {

        if (!bundle) {
          return [];
        }
        const entries = bundle.entry;
        const rows = [];

        entries.forEach(entry => {
            const appointment = entry.resource as Appointment;

            const element = new AppointmentRow(
              appointment.id,
              appointment.description ?? '--',
              appointment.start,
              appointment.end,
              appointment.status,
              false, appointment);
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

  openDialog(resource: Appointment) {
    this.dialog.open(FhirAppointmentDetailModalComponent, {
      data: {appointment: resource},
      position: {right: '0'}
    });
  }

}


class AppointmentRow {
  id: string;
  description: string;
  start: string;
  end: string;
  status: string;
  expanded: boolean;
  resource: Appointment;

  constructor(id: string, description: string, start: string, end: string, status: string, expanded: boolean, resource: Appointment) {
    this.id = id;
    this.description = description;
    this.start = start;
    this.end = end;
    this.status = status;

    this.expanded = expanded;
    this.resource = resource;
  }
}
