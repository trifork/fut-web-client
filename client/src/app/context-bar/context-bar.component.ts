import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {IdType} from '../fhir/id-type';
import {EHealthContext} from '../user/model/ehealth-context';

@Component({
  selector: 'app-context-bar',
  templateUrl: './context-bar.component.html',
  styleUrls: ['./context-bar.component.css']
})
export class ContextBarComponent implements OnInit {
  trim = IdType.trim;
  context: EHealthContext;
  hasContext: boolean;
  careTeam: string;
  organization: string;
  patient: string;
  episodeOfCare: string;

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.currentContext$.subscribe(context => {
      this.context = context;
      this.careTeam = this.format(context?.careTeam);
      this.organization = this.format(context?.organization);
      this.patient = this.format(context?.patient);
      this.episodeOfCare = this.format(context?.episodeOfCare);
      this.hasContext = this.organization != null || this.careTeam != null;
    });
  }

  format(id: string): string {
    return id ? IdType.parse(id).getUnqualifiedVersionLess().replace('/', ': ') : null;
  }

}
