import {Component, OnInit} from '@angular/core';
import {FhirService} from '../../fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LoadingService} from "../../../spinner/loading.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FhirOrganizationDetailModalComponent} from "../organization-detail-modal/fhir-organization-detail-modal.component";
import {MatDialog} from "@angular/material/dialog";
import Bundle = fhir.Bundle;
import Organization = fhir.Organization;
import BundleLink = fhir.BundleLink;

@Component({
  selector: 'fhir-organization-search',
  templateUrl: './fhir-organization-search.component.html',
  styleUrls: ['./fhir-organization-search.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class FhirOrganizationSearchComponent implements OnInit {

  bundle: BehaviorSubject<Bundle>;
  bundle$: Observable<Bundle>;
  next: BundleLink;
  previous: BundleLink;

  rows$: Observable<OrganizationRow[]>;
  displayedColumns = ['id', 'name', 'identifier', 'details'];

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
    this.fhir.searchOrganization().subscribe(b => {
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
              const org = entry.resource as Organization;
              const element = new OrganizationRow(
                org.id,
                org.alias != null ? org.alias?.join(',') : org.name,
                org.identifier != null ? org.identifier[0].value : '--',
                false, org
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

  openDialog(resource: Organization) {
    this.dialog.open(FhirOrganizationDetailModalComponent, {
      data: {organization: resource},
      position: {right: '0'}
    });
  }

}

class OrganizationRow {
  id: string;
  name: string;
  identifier: string;
  expanded: boolean;
  resource: Organization;

  constructor(id: string, name: string, identifier: string, expanded: boolean, resource: Organization) {
    this.id = id;
    this.name = name;
    this.identifier = identifier;
    this.expanded = expanded;
    this.resource = resource;
  }
}
