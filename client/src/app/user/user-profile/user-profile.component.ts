import {Component, Input, OnInit} from '@angular/core';
import {FhirService} from '../../fhir/fhir.service';
import {UserService} from '../user.service';
import {IdType} from '../../fhir/id-type';
import {UserProfile} from '../model/user-profile';
import {EHealthContext} from '../model/ehealth-context';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() userProfile: UserProfile;
  @Input() context: EHealthContext;

  constructor(public readonly fhir: FhirService, public readonly userService: UserService) {
  }

  ngOnInit(): void {
  }

  public trim(id: string): string {
    return IdType.parse(id).getIdPart();
  }
}
