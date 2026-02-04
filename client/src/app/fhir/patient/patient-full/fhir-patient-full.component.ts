import {Component, Input, OnInit} from '@angular/core';
import Patient = fhir.Patient;

@Component({
    selector: 'fhir-patient-full',
    templateUrl: './fhir-patient-full.component.html',
    styleUrls: ['./fhir-patient-full.component.css'],
    standalone: false
})
export class FhirPatientFullComponent implements OnInit {

  @Input() patient: Patient;

  constructor() { }

  ngOnInit(): void {
  }

}
