export class EHealthContext {
  public careTeam: string;
  public organization: string;
  public patient: string;
  public episodeOfCare: string;


  constructor(careTeam: string, organization: string, patient: string, episodeOfCare: string) {
    this.careTeam = careTeam;
    this.organization = organization;
    this.patient = patient;
    this.episodeOfCare = episodeOfCare;
  }
}
