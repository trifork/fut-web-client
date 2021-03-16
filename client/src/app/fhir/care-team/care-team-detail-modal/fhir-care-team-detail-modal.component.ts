import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import CareTeam = fhir.CareTeam;

@Component({
  selector: 'fhir-care-team-detail-modal',
  templateUrl: './fhir-care-team-detail-modal.component.html',
  styleUrls: ['./fhir-care-team-detail-modal.component.css']
})
export class FhirCareTeamDetailModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }
}

export interface DialogData {
  careTeam: CareTeam;
}
