import {Component, Input, OnInit} from '@angular/core';
import Appointment = fhir.Appointment;

@Component({
  selector: 'fhir-appointment-detail',
  templateUrl: './fhir-appointment-detail.component.html',
  styleUrls: ['./fhir-appointment-detail.component.css']
})
export class FhirAppointmentDetailComponent implements OnInit {

  @Input() appointment: Appointment;

  constructor() { }

  ngOnInit(): void {
  }

}
