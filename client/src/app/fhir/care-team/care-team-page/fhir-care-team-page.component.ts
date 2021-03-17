import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FhirService} from '../../fhir.service';
import {map, switchMap} from 'rxjs/operators';
import CareTeam = fhir.CareTeam;

@Component({
  selector: 'fhir-care-team-page',
  templateUrl: './fhir-care-team-page.component.html',
  styleUrls: ['./fhir-care-team-page.component.css']
})
export class FhirCareTeamPageComponent implements OnInit {

  careTeam: CareTeam;

  constructor(private route: ActivatedRoute, private readonly fhir: FhirService) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe<string>(map(params => params.id))
      .pipe(switchMap(id => this.fhir.readCareTeam(id)))
      .subscribe(team => this.careTeam = team);
  }

}
