import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import Communication = fhir.Communication;

@Component({
  selector: 'fhir-message-detail-modal',
  templateUrl: './fhir-message-detail-modal.component.html',
  styleUrls: ['./fhir-message-detail-modal.component.css']
})
export class FhirMessageDetailModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }
}

export interface DialogData {
  message: Communication;
}
