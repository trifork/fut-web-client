import {Component, Input, OnInit} from '@angular/core';
import Communication = fhir.Communication;

@Component({
  selector: 'fhir-message-detail',
  templateUrl: './fhir-message-detail.component.html',
  styleUrls: ['./fhir-message-detail.component.css']
})
export class FhirMessageDetailComponent implements OnInit {

  @Input() message: Communication;

  constructor() { }

  ngOnInit(): void {
  }

}
