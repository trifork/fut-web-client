import { Component, OnInit } from '@angular/core';
import {FhirService} from "../../fhir.service";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import Task = fhir.Task;

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {

  task: Task;

  constructor(private fhir: FhirService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe<string>(map(params => params.id))
      .pipe(switchMap(id => this.fhir.readTask(id)))
      .subscribe(a => this.task = a);
  }

}
