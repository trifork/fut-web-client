import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {FhirService} from "../../fhir.service";
import {LoadingService} from "../../../spinner/loading.service";
import {UserService} from "../../../user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {map} from "rxjs/operators";
import {TaskDetailModalComponent} from "../task-detail-modal/task-detail-modal.component";
import Task = fhir.Task;
import Bundle = fhir.Bundle;
import BundleLink = fhir.BundleLink;
import {IdType} from "../../id-type";

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent implements OnInit {

  bundle: BehaviorSubject<Bundle>;
  bundle$: Observable<Bundle>;
  next: BundleLink;
  previous: BundleLink;

  rows$: Observable<TaskLine[]>;
  displayedColumns = ['id', 'status', 'intent', 'priority', 'context', 'details'];

  team: string;

  constructor(private fhir: FhirService, public loadingService: LoadingService, private userService: UserService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userService.currentContext$
      .subscribe(ctx => this.team = ctx?.careTeam);
  }

  loadNext(): void {
    this.fhir.getPage(this.next, 'task-service').subscribe(b => this.bundle.next(b));
  }

  loadPrevious(): void {
    this.fhir.getPage(this.previous, 'task-service').subscribe(b => this.bundle.next(b));
  }

  search(): void {
    this.fhir.searchTask(this.team).subscribe(b => {
      this.bundle = new BehaviorSubject<fhir.Bundle>(b);
      this.bundle$ = this.bundle.asObservable();

      this.rows$ = this.bundle$
        .pipe(map(bundle => {

          const entries = bundle?.entry ?? [];
          const rows = [];

          entries.forEach(entry => {
              const task = entry.resource as Task;
              const element = new TaskLine(
                task.id,
                task.status,
                task.intent,
                task.priority,
                IdType.parse(task.context.reference).getUnqualifiedVersionLess(),
                task
              )
              rows.push(element);
            }
          );
          return rows;
        }));

      this.bundle$.subscribe(
        bundle => {
          this.next = bundle.link.filter(link => link.relation === 'next').pop();
          this.previous = bundle.link.filter(link => link.relation === 'previous').pop();
        }
      );
    });
  }

  openDialog(resource: Task) {
    this.dialog.open(TaskDetailModalComponent, {
      data: {task: resource},
      position: {right: '0'}
    });
  }
}

export class TaskLine {
  id: string;
  status: string;
  intent: string;
  priority: string;
  context: string;

  resource: Task;

  constructor(id: string, status: string, intent: string, priority: string, context: string, resource: Task) {
    this.id = id;
    this.status = status;
    this.intent = intent;

    this.priority = priority;
    this.context = context;

    this.resource = resource;
  }
}
