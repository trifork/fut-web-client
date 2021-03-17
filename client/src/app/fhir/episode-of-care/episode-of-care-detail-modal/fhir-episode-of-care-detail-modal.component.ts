import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import EpisodeOfCare = fhir.EpisodeOfCare;

@Component({
  selector: 'fhir-episode-of-care-detail-modal',
  templateUrl: './fhir-episode-of-care-detail-modal.component.html',
  styleUrls: ['./fhir-episode-of-care-detail-modal.component.css']
})
export class FhirEpisodeOfCareDetailModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }
}

export interface DialogData {
  episodeOfCare: EpisodeOfCare;
}

