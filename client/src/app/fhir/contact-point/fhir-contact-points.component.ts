import {Component, OnInit, Input} from '@angular/core';
import ContactPoint = fhir.ContactPoint;

@Component({
  selector: 'fhir-contact-points',
  templateUrl: './fhir-contact-points.component.html',
  styleUrls: ['./fhir-contact-points.component.css']
})
export class FhirContactPointsComponent implements OnInit {

  @Input() contactPoints: ContactPoint[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
