import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(public readonly userService: UserService) {
  }

  async ngOnInit(): Promise<void> {
    this.userService.isLoggedIn().then(v => this.isLoggedIn = v);
    console.log('uc');
    // this.userService.update();
  }
}
