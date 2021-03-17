import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import Patient = fhir.Patient;

@Component({
  selector: 'fhir-patient-detail-modal',
  templateUrl: './fhir-patient-detail-modal.component.html',
  styleUrls: ['./fhir-patient-detail-modal.component.css']
})
export class FhirPatientDetailModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }
}

export interface DialogData {
  patient: Patient;
}
