import {Component, Input, OnInit} from '@angular/core';
import Organization = fhir.Organization;
import CodeableConcept = fhir.CodeableConcept;

@Component({
  selector: 'fhir-organization-detail',
  templateUrl: './fhir-organization-detail.component.html',
  styleUrls: ['./fhir-organization-detail.component.css']
})
export class FhirOrganizationDetailComponent implements OnInit {

  @Input() organization: Organization;

  constructor() { }

  ngOnInit(): void {
  }

  getCVR(): string {
    return this.organization.extension
      .filter(val => val.url === 'http://ehealth.sundhed.dk/fhir/StructureDefinition/ehealth-organization-cvrNumber')[0]?.valueString;
  }

  getRegion(): string {
    return this.organization.extension
      .filter(val => val.url === 'http://ehealth.sundhed.dk/fhir/StructureDefinition/ehealth-organization-regionCode')[0]?.valueString;
  }

  getMunicipality(): string {
    return this.organization.extension
      .filter(val => val.url === 'http://ehealth.sundhed.dk/fhir/StructureDefinition/ehealth-organization-municipalityCode')[0]?.valueString;
  }

  getSource(): CodeableConcept {
    return this.organization.extension
      .filter(val => val.url === 'http://ehealth.sundhed.dk/fhir/StructureDefinition/ehealth-organization-source')[0]?.valueCodeableConcept;
  }

  getSyncStatus(): CodeableConcept {
    return this.organization.extension
      .filter(val => val.url === 'http://ehealth.sundhed.dk/fhir/StructureDefinition/ehealth-organization-synchronizationStatus')[0]
      ?.valueCodeableConcept;
  }

}
