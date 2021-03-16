import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import Organization = fhir.Organization;

@Component({
  selector: 'fhir-organization-detail-modal',
  templateUrl: './fhir-organization-detail-modal.component.html',
  styleUrls: ['./fhir-organization-detail-modal.component.css']
})
export class FhirOrganizationDetailModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }
}

export interface DialogData {
  organization: Organization;
}
