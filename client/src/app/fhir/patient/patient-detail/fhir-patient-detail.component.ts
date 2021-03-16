import {Component, Input, OnInit} from '@angular/core';
import Patient = fhir.Patient;

@Component({
  selector: 'fhir-patient-detail',
  templateUrl: './fhir-patient-detail.component.html',
  styleUrls: ['./fhir-patient-detail.component.css']
})
export class FhirPatientDetailComponent implements OnInit {

  @Input() patient: Patient;

  constructor() {
  }

  ngOnInit(): void {
  }

  fullName(): string {
    return this.patient.name
      .filter(n => n.use === 'official')
      .map(n => n.given.join(' ') + ' ' + n.family).pop();
  }

  cpr(): string {
    return this.patient.identifier
      .filter(i => i.use === 'official')
      .filter(i => i.system === 'urn:oid:1.2.208.176.1.2')
      .map(i => i.value).pop();
  }


}
