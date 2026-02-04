import {Component, Input, OnInit} from '@angular/core';
import Identifier = fhir.Identifier;

@Component({
    selector: 'fhir-identifiers',
    templateUrl: './fhir-identifiers.component.html',
    styleUrls: ['./fhir-identifiers.component.css'],
    standalone: false
})
export class FhirIdentifiersComponent implements OnInit {

  @Input() identifier: Identifier[];

  constructor() { }

  ngOnInit(): void {
  }

}
