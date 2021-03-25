import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  @Input() task: fhir.Task;

  constructor() { }

  ngOnInit(): void {
  }

}
