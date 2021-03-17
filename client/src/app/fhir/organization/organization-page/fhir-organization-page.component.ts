import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FhirService} from '../../fhir.service';
import {map, switchMap} from 'rxjs/operators';
import Organization = fhir.Organization;

@Component({
  selector: 'fhir-organization',
  templateUrl: './fhir-organization-page.component.html',
  styleUrls: ['./fhir-organization-page.component.css']
})
export class FhirOrganizationPageComponent implements OnInit {

  organization: Organization;

  constructor(private route: ActivatedRoute, private readonly fhir: FhirService) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe<string>(map(params => params.id))
      .pipe(switchMap(id => this.fhir.readOrganization(id)))
      .subscribe(org => this.organization = org);
  }

}
