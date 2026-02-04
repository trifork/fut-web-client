import {Component, Input, OnInit} from '@angular/core';
import Coding = fhir.Coding;

@Component({
    selector: 'fhir-coding',
    templateUrl: './fhir-coding.component.html',
    styleUrls: ['./fhir-coding.component.css'],
    standalone: false
})
export class FhirCodingComponent implements OnInit {

  @Input() coding: Coding;

  constructor() {
  }

  ngOnInit(): void {
  }

}
