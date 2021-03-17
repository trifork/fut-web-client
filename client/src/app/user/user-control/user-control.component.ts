import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {UserProfile} from '../model/user-profile';
import {IdType} from '../../fhir/id-type';

@Component({
  selector: 'fut-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.css']
})
export class UserControlComponent implements OnInit {
  trim = IdType.trim;
  isLoggedIn: boolean;
  userProfile: UserProfile;

  constructor(public readonly userService: UserService) {
  }

  async ngOnInit(): Promise<void> {
    this.userService.isLoggedIn().then(v => this.isLoggedIn = v);
    this.userService.userProfile$.subscribe(value => this.userProfile = value);
  }
}
