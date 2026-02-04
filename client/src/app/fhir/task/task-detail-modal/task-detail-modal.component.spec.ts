import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskDetailModalComponent } from './task-detail-modal.component';

describe('TaskDetailModalComponent', () => {
  let component: TaskDetailModalComponent;
  let fixture: ComponentFixture<TaskDetailModalComponent>;

  const mockTask: fhir.Task = {
    resourceType: 'Task',
    id: 'task-1',
    status: 'requested',
    intent: 'order'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskDetailModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { task: mockTask } },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive task data', () => {
    expect(component.data.task).toBeTruthy();
    expect(component.data.task.id).toBe('task-1');
  });
});
