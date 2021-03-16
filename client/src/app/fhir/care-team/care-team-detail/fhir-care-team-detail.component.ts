import {Component, Input, OnInit} from '@angular/core';
import CareTeam = fhir.CareTeam;

@Component({
  selector: 'fhir-care-team-detail',
  templateUrl: './fhir-care-team-detail.component.html',
  styleUrls: ['./fhir-care-team-detail.component.css']
})
export class FhirCareTeamDetailComponent implements OnInit {

  @Input() careTeam: CareTeam;

  constructor() { }

  ngOnInit(): void {
  }

}
