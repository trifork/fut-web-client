import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {FhirService} from '../../fhir.service';
import {LoadingService} from '../../../spinner/loading.service';
import {UserService} from '../../../user/user.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {IdType} from '../../id-type';
import {environment} from '../../../../environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {FhirEpisodeOfCareDetailModalComponent} from '../episode-of-care-detail-modal/fhir-episode-of-care-detail-modal.component';
import Bundle = fhir.Bundle;
import BundleLink = fhir.BundleLink;
import EpisodeOfCare = fhir.EpisodeOfCare;

@Component({
  selector: 'fhir-episode-of-care-search',
  templateUrl: './fhir-episode-of-care-search.component.html',
  styleUrls: ['./fhir-episode-of-care-search.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class FhirEpisodeOfCareSearchComponent implements OnInit {

  bundle: BehaviorSubject<Bundle>;
  bundle$: Observable<Bundle>;
  next: BundleLink;
  previous: BundleLink;

  rows$: Observable<EpisodeOfCareLine[]>;
  displayedColumns = ['id', 'status', 'patient' , 'start', 'end', 'details'];

  team: string;

  isExpansionDetailRow = (i: number, row: object) => row.hasOwnProperty('detailRow');

  constructor(private fhir: FhirService, public loadingService: LoadingService, private userService: UserService,  public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userService.currentContext$
      .subscribe(ctx => this.team = ctx?.careTeam);

  }

  loadNext(): void {
    this.fhir.getPage(this.next, 'care-plan-service').subscribe(b => this.bundle.next(b));
  }

  loadPrevious(): void {
    this.fhir.getPage(this.previous, 'care-plan-service').subscribe(b => this.bundle.next(b));
  }

  search(): void {
    this.fhir.searchEpisodeOfCare(this.team).subscribe(b => {
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
              const eoc = entry.resource as EpisodeOfCare;
              const element = new EpisodeOfCareLine(
                eoc.id,
                eoc.status,
                eoc?.patient?.reference != null ? IdType.parse(eoc.patient.reference).getUnqualifiedVersionLess() : '--',
                eoc.period.start,
                eoc.period.end,
                false, eoc
              );
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

  addEpisodeOfCareToContext(eoc: EpisodeOfCare): void {
    this.userService.addEpisodeOfCareToContext('https://careplan.' + environment.baseUrl + '/fhir/EpisodeOfCare/' + eoc.id);
  }

  addPatientToContext(eoc: EpisodeOfCare): void {
    this.userService.addPatientToContext(eoc.patient.reference);
  }

  openDialog(resource: EpisodeOfCare): void {
    this.dialog.open(FhirEpisodeOfCareDetailModalComponent, {
      data: {episodeOfCare: resource},
      position: {right: '0'}
    });
  }
}

export class EpisodeOfCareLine {
  id: string;
  status: string;
  patient: string;
  start: string;
  end: string;

  expanded: boolean;
  resource: EpisodeOfCare;

  constructor(id: string, status: string, patient: string, start: string, end: string, expanded: boolean, resource: EpisodeOfCare) {
    this.id = id;
    this.status = status;
    this.patient = patient;

    this.start = start;
    this.end = end;

    this.expanded = expanded;
    this.resource = resource;
  }
}
