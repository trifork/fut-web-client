import {Inject, Injectable, Optional} from '@angular/core';
import {BaseUrl} from '../app-routing/base-url';
import {
  DEFAULT_MULTI_SERVER_CONFIG,
  FHIR_ENDPOINT_CONFIG,
  FhirEndpointConfig,
  FhirResourceType
} from './fhir-endpoint.config';

@Injectable({
  providedIn: 'root'
})
export class FhirEndpointResolverService {
  private readonly config: FhirEndpointConfig;

  constructor(@Optional() @Inject(FHIR_ENDPOINT_CONFIG) config: FhirEndpointConfig | null) {
    this.config = config ?? DEFAULT_MULTI_SERVER_CONFIG;
  }

  getBasePath(resourceType: FhirResourceType): string {
    if (this.config.mode === 'single') {
      return this.config.singleServerPath;
    }
    return this.config.resourceEndpoints[resourceType];
  }

  buildResourceUrl(resourceType: FhirResourceType, id?: string): string {
    const basePath = this.getBasePath(resourceType);
    const url = BaseUrl.get() + basePath + '/' + resourceType;
    return id ? url + '/' + id : url;
  }

  buildPaginationUrl(resourceType: FhirResourceType, queryString: string): string {
    const basePath = this.getBasePath(resourceType);
    return BaseUrl.get() + basePath + queryString;
  }
}
