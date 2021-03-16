import {Component, Input, OnInit} from '@angular/core';
import Address = fhir.Address;

@Component({
  selector: 'fhir-addresses',
  templateUrl: './fhir-addresses.component.html',
  styleUrls: ['./fhir-addresses.component.css']
})
export class FhirAddressesComponent implements OnInit {

  @Input() addresses: Address[];

  constructor() { }

  ngOnInit(): void {
  }

}
