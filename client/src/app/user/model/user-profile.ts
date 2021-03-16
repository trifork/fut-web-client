import {EHealthContext} from './ehealth-context';

export class UserProfile {
  public name: string;
  public type: string;
  public id: string;
  public roles: string[];
  public context: EHealthContext;
  public url: string;
}
