import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import Appointment = fhir.Appointment;

@Component({
  selector: 'fhir-appointment-detail-modal',
  templateUrl: './fhir-appointment-detail-modal.component.html',
  styleUrls: ['./fhir-appointment-detail-modal.component.css']
})
export class FhirAppointmentDetailModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }

}

export interface DialogData {
  appointment: Appointment;
}
