import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {AvailableContext} from '../model/available-context';

@Component({
  selector: 'app-available-context',
  templateUrl: './available-context.component.html',
  styleUrls: ['./available-context.component.css']
})
export class AvailableContextComponent implements OnInit {

  @Input() availableContext: AvailableContext;

  constructor(public readonly userService: UserService) {
  }

  ngOnInit(): void {
  }

}
