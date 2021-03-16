import {Component, OnInit} from '@angular/core';
import {FhirService} from '../../fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LoadingService} from '../../../spinner/loading.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {FhirCareTeamDetailModalComponent} from '../care-team-detail-modal/fhir-care-team-detail-modal.component';
import Bundle = fhir.Bundle;
import BundleLink = fhir.BundleLink;
import CareTeam = fhir.CareTeam;

@Component({
  selector: 'fhir-care-team-search',
  templateUrl: './fhir-care-team-search.component.html',
  styleUrls: ['./fhir-care-team-search.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class FhirCareTeamSearchComponent implements OnInit {

  bundle: BehaviorSubject<Bundle>;
  bundle$: Observable<Bundle>;
  next: BundleLink;
  previous: BundleLink;

  rows$: Observable<CareTeamRow[]>;
  displayedColumns = ['id', 'name', 'identifier', 'reasonCode', 'details'];

  isExpansionDetailRow = (i: number, row: object) => row.hasOwnProperty('detailRow');

  constructor(private fhir: FhirService, public loadingService: LoadingService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  loadNext(): void {
    this.fhir.getPage(this.next, 'organization-service').subscribe(b => this.bundle.next(b));
  }

  loadPrevious(): void {
    this.fhir.getPage(this.previous, 'organization-service').subscribe(b => this.bundle.next(b));
  }

  search(): void {
    this.fhir.searchCareTeam().subscribe(b => {
      this.bundle = new BehaviorSubject<fhir.Bundle>(b);
      this.bundle$ = this.bundle.asObservable();

      this.rows$ = this.bundle$
        .pipe(map(bundle => {

          if (!bundle) {
            return [];
          }
          const entries = bundle.entry;
          const rows = [];

          entries.forEach(entry => {
              const careTeam = entry.resource as CareTeam;
              const element = new CareTeamRow(
                careTeam.id, careTeam.name, careTeam.identifier[0].value, careTeam.reasonCode[0].coding[0].code, false, careTeam
              )
              rows.push(element);
            }
          );
          return rows;
        }));

      this.bundle$.subscribe(
        bundle => {
          this.next = bundle.link.filter(link => link.relation === 'next').pop();
          this.previous = bundle.link.filter(link => link.relation === 'previous').pop();
        }
      );
    });
  }

  openDialog(resource: CareTeam) {
    this.dialog.open(FhirCareTeamDetailModalComponent, {
      data: {careTeam: resource},
      position: {right: '0'}
    });
  }

}

class CareTeamRow {
  id: string;
  name: string;
  identifier: string;
  reasonCode: string;
  expanded: boolean;
  resource: CareTeam;

  constructor(id: string, name: string, identifier: string, reasonCode: string, expanded: boolean, resource: CareTeam) {
    this.id = id;
    this.name = name;
    this.identifier = identifier;
    this.reasonCode = reasonCode;
    this.expanded = expanded;
    this.resource = resource;
  }
}
