import {Component, enableProdMode, Input, OnInit} from '@angular/core';
import EpisodeOfCare = fhir.EpisodeOfCare;
import {IdType} from "../../id-type";
import Reference = fhir.Reference;

@Component({
  selector: 'fhir-episode-of-care-detail',
  templateUrl: './fhir-episode-of-care-detail.component.html',
  styleUrls: ['./fhir-episode-of-care-detail.component.css']
})
export class FhirEpisodeOfCareDetailComponent implements OnInit {

  @Input() episodeOfCare: EpisodeOfCare;

  teams: IdType[];
  patient: IdType;
  managingOrganization: IdType;
  careManagerOrganization: IdType;

  constructor() {
  }

  ngOnInit(): void {

    if (this.episodeOfCare) {
      this.teams = this.episodeOfCare?.team?.map(team => IdType.parse(team.reference));
      this.patient = this.getId(this.episodeOfCare?.patient);
      this.managingOrganization = this.getId(this.episodeOfCare?.managingOrganization);
      this.careManagerOrganization = this.episodeOfCare?.extension
        .filter(ext => ext.url === 'http://ehealth.sundhed.dk/fhir/StructureDefinition/ehealth-episodeofcare-caremanagerOrganization')
        .map(ext => ext.valueReference)
        .map(ref => this.getId(ref))[0];
    }
  }

  getId(ref: Reference): IdType {
    return ref?.reference ? IdType.parse(ref.reference) : null
  }

}
