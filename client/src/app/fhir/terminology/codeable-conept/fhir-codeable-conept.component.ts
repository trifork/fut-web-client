import {Component, Input, OnInit} from '@angular/core';
import CodeableConcept = fhir.CodeableConcept;

@Component({
  selector: 'fhir-codeable-conept',
  templateUrl: './fhir-codeable-conept.component.html',
  styleUrls: ['./fhir-codeable-conept.component.css']
})
export class FhirCodeableConeptComponent implements OnInit {

  @Input() codeableConcept: CodeableConcept;

  constructor() { }

  ngOnInit(): void {
  }

}
