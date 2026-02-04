import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TaskPageComponent } from './task-page.component';
import { FhirService } from '../../fhir.service';

describe('TaskPageComponent', () => {
  let component: TaskPageComponent;
  let fixture: ComponentFixture<TaskPageComponent>;
  let mockFhirService: jasmine.SpyObj<FhirService>;

  const mockTask: fhir.Task = {
    resourceType: 'Task',
    id: 'task-1',
    status: 'requested',
    intent: 'order'
  };

  beforeEach(async () => {
    mockFhirService = jasmine.createSpyObj('FhirService', ['readTask']);
    mockFhirService.readTask.and.returnValue(of(mockTask));

    await TestBed.configureTestingModule({
      declarations: [TaskPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 'task-1' }) } },
        { provide: FhirService, useValue: mockFhirService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load task on init', () => {
    expect(mockFhirService.readTask).toHaveBeenCalledWith('task-1');
    expect(component.task).toBeTruthy();
  });
});
