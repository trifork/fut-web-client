import { Component, OnInit } from '@angular/core';
import {FhirService} from '../../fhir.service';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import Patient = fhir.Patient;

@Component({
  selector: 'fhir-patient-page',
  templateUrl: './fhir-patient-page.component.html',
  styleUrls: ['./fhir-patient-page.component.css']
})
export class FhirPatientPageComponent implements OnInit {

  patient: Patient;

  constructor(private route: ActivatedRoute, private readonly fhir: FhirService) { }

  ngOnInit(): void {
    this.route.params
      .pipe<string>(map(params => params['id']))
      .pipe(switchMap(id => this.fhir.readPatient(id)))
      .subscribe(patient => this.patient = patient);
  }

}
