import {Component, OnInit} from '@angular/core';
import {FhirService} from '../../fhir/fhir.service';
import {UserService} from '../user.service';
import {IdType} from '../../fhir/id-type';
import {UserProfile} from '../model/user-profile';
import {EHealthContext} from '../model/ehealth-context';

@Component({
  selector: 'fut-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  trim = IdType.trim;
  userProfile: UserProfile;
  context: EHealthContext;

  constructor(public readonly fhir: FhirService, public readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.userProfile$.subscribe(value => this.userProfile = value);
    this.userService.currentContext$.subscribe(value => this.context = value);
  }

}
