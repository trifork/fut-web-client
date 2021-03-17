import { Component, OnInit } from '@angular/core';
import EpisodeOfCare = fhir.EpisodeOfCare;
import {FhirService} from '../../fhir.service';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'fhir-episode-of-care-page',
  templateUrl: './fhir-episode-of-care-page.component.html',
  styleUrls: ['./fhir-episode-of-care-page.component.css']
})
export class FhirEpisodeOfCarePageComponent implements OnInit {

  episodeOfCare: EpisodeOfCare;

  constructor(private fhir: FhirService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe<string>(map(params => params.id))
      .pipe(switchMap(id => this.fhir.readEpisodeOfCare(id)))
      .subscribe(a => this.episodeOfCare = a);
  }

}
