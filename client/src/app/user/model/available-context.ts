export interface AvailableContext {
  care_teams: AvailableContextPart[];
  organizations: AvailableContextPart[];
}

export interface AvailableContextPart {
  id: string;
  name: string;
  affiliation: AvailableContextPart;
  roles: string[];
}
