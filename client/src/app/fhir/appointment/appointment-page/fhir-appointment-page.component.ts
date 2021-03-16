import {Component, OnInit} from '@angular/core';
import {FhirService} from "../../fhir.service";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import Appointment = fhir.Appointment;

@Component({
  selector: 'fhir-appointment-page',
  templateUrl: './fhir-appointment-page.component.html',
  styleUrls: ['./fhir-appointment-page.component.css']
})
export class FhirAppointmentPageComponent implements OnInit {

  appointment: Appointment;

  constructor(private fhir: FhirService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe<string>(map(params => params['id']))
      .pipe(switchMap(id => this.fhir.readAppointment(id)))
      .subscribe(a => this.appointment = a)
  }

}
