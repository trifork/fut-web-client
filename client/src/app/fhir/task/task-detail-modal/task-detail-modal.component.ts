import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import Task = fhir.Task;

@Component({
  selector: 'app-task-detail-modal',
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.css']
})
export class TaskDetailModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }
}

export interface DialogData {
  task: Task;
}
