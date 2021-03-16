export class BaseUrl {

  static get(): string {
    return window.location.protocol + '//' + window.location.host;
  }

}
