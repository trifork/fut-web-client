import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableContextComponent } from './available-context.component';

describe('AvailableContextComponent', () => {
  let component: AvailableContextComponent;
  let fixture: ComponentFixture<AvailableContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableContextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
