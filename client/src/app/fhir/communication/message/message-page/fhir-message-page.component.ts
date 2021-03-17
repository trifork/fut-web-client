import { Component, OnInit } from '@angular/core';
import Communication = fhir.Communication;
import {FhirService} from '../../../fhir.service';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'fhir-message-page',
  templateUrl: './fhir-message-page.component.html',
  styleUrls: ['./fhir-message-page.component.css']
})
export class FhirMessagePageComponent implements OnInit {

  message: Communication;

  constructor(private fhir: FhirService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe<string>(map(params => params.id))
      .pipe(switchMap(id => this.fhir.readMessage(id)))
      .subscribe(a => this.message = a);
  }

}
