import {Component, OnInit} from '@angular/core';
import {UserService} from './user/user.service';
import packageJson from '../../package.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
  public version: string = packageJson.version;
  title = 'client';
  showSidenav = true;

  constructor(public userService: UserService) {
  }

  async ngOnInit(): Promise<void> {
  }
}
