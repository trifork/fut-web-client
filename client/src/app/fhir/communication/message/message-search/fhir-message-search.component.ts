import {Component, OnInit} from '@angular/core';
import {FhirService} from '../../../fhir.service';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {BehaviorSubject, Observable} from "rxjs";
import {LoadingService} from "../../../../spinner/loading.service";
import {map} from "rxjs/operators";
import {FhirMessageDetailModalComponent} from "../message-detail-modal/fhir-message-detail-modal.component";
import {MatDialog} from "@angular/material/dialog";
import Bundle = fhir.Bundle;
import BundleLink = fhir.BundleLink;
import Communication = fhir.Communication;

@Component({
  selector: 'fhir-message-search',
  templateUrl: './fhir-message-search.component.html',
  styleUrls: ['./fhir-message-search.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class FhirMessageSearchComponent implements OnInit {

  bundle: BehaviorSubject<Bundle>;
  bundle$: Observable<Bundle>;
  next: BundleLink;
  previous: BundleLink;

  rows$: Observable<MessageRow[]>;
  displayedColumns = ['id', 'category', 'medium', 'sent', 'sender', 'details'];

  isExpansionDetailRow = (i: number, row: object) => row.hasOwnProperty('detailRow');


  constructor(private fhir: FhirService, public loadingService: LoadingService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  loadNext(): void {
    this.fhir.getPage(this.next, 'patient-service').subscribe(b => this.bundle.next(b));
  }

  loadPrevious(): void {
    this.fhir.getPage(this.previous, 'patient-service').subscribe(b => this.bundle.next(b));
  }

  search(): void {
    this.fhir.searchMessages().subscribe(b => {
      this.bundle = new BehaviorSubject<fhir.Bundle>(b);
      this.bundle$ = this.bundle.asObservable();

      this.rows$ = this.bundle$
        .pipe(map(bundle => {

          if (!bundle) {
            console.log("empty")
            return [];
          }

          console.log("not empty")

          const entries = bundle.entry;
          const rows = [];

          entries.forEach(entry => {
              const com = entry.resource as Communication;
              const element = new MessageRow(
                com.id, com?.category[0]?.coding[0]?.code ?? '--',
                com?.medium[0]?.coding[0]?.code,
                com.sent, com?.sender?.reference, false, com
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

  openDialog(resource: Communication) {
    this.dialog.open(FhirMessageDetailModalComponent, {
      data: {message: resource},
      position: {right: '0'}
    });
  }
}

class MessageRow {
  id: string;
  category: string;
  medium: string;
  sent: string;
  sender: string;
  expanded: boolean;
  resource: Communication;

  constructor(id: string, category: string, medium: string, sent: string, sender: string, expanded: boolean, resource: Communication) {
    this.id = id;
    this.category = category;
    this.medium = medium;
    this.sent = sent;
    this.sender = sender;
    this.expanded = expanded;
    this.resource = resource;
  }
}
