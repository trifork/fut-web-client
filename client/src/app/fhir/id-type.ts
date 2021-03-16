export class IdType {

  readonly id: string;
  readonly baseurl: string;
  readonly resourceType: string;
  readonly version: string;

  static parse(value: string): IdType {
    let copy = value;
    let version: string;
    let id: string;
    let type: string;
    let base: string;
    const hist = '/_history/';
    let idx = copy.indexOf(hist);

    if (idx >= 0) {
      version = copy.substr(idx + hist.length);
      copy = copy.substr(0, idx);
    }

    idx = copy.lastIndexOf('/');
    if (idx >= 0) {
      id = copy.substr(idx + 1);
      copy = copy.substr(0, idx);
    }

    idx = copy.lastIndexOf('/');
    if (idx >= 0) {
      type = copy.substr(idx + 1);
      base = copy.substr(0, idx);
    } else {
      type = copy;
    }

    return new IdType(id, base, type, version);
  }

  constructor(id: string, baseurl: string, resourceType: string, version: string) {
    this.id = id;
    this.baseurl = baseurl;
    this.resourceType = resourceType;
    this.version = version;
  }

  getValue(): string {
    let value = '';

    if (this.baseurl) {
      value += this.baseurl + '/';
    }

    if (this.resourceType) {
      value += this.resourceType + '/';
    }

    if (this.id) {
      value += this.id;
    }

    if (this.version) {
      value += '/_history/' + this.version;
    }

    return value;
  }

  getUnqualifiedVersionLess(): string {
    let value = '';

    if (this.resourceType) {
      value += this.resourceType + '/';
    }

    if (this.id) {
      value += this.id;
    }

    return value;
  }

  getIdPart(): string {
    return this.id;
  }

}
