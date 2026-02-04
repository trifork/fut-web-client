import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {UserProfile} from '../model/user-profile';
import {IdType} from '../../fhir/id-type';

@Component({
    selector: 'fut-user-control',
    templateUrl: './user-control.component.html',
    styleUrls: ['./user-control.component.css'],
    standalone: false
})
export class UserControlComponent implements OnInit {
  trim = IdType.trim;
  isLoggedIn: boolean;
  userProfile: UserProfile;

  constructor(public readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.userService.userProfile$.subscribe(value => this.userProfile = value);
  }
}
