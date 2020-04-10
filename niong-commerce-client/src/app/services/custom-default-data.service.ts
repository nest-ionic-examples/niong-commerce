import {
  DefaultDataService,
  DefaultDataServiceConfig,
  EntityCollectionDataService,
  HttpUrlGenerator,
  QueryParams
} from '@ngrx/data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/page';
import { map } from 'rxjs/operators';

@Injectable()
export class CustomDefaultDataService<T> extends DefaultDataService<T> {
  constructor(entityName: string,
              http: HttpClient,
              httpUrlGenerator: HttpUrlGenerator,
              config?: DefaultDataServiceConfig) {
    super(entityName, http, httpUrlGenerator, config);
    this.entityUrl = this.entitiesUrl;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.entitiesUrl, {params: {size: '0'}});
  }

  getWithQuery(queryParams: QueryParams | string): Observable<T[]> {
    // if (typeof queryParams === 'string') {
    //   queryParams = [queryParams, 'page=0'].join('&');
    // } else {
    //   queryParams.page = '0';
    // }
    return this.getPageWithQuery(queryParams).pipe(map(page => page.items));
  }

  getPageWithQuery(queryParams: QueryParams | string): Observable<Page<T>> {
    const qParams = typeof queryParams === 'string'
      ? {fromString: queryParams}
      : {fromObject: queryParams};
    const params = new HttpParams(qParams);
    return this.http.get<Page<T>>(this.entitiesUrl, {params});
  }
}

@Injectable()
export class CustomDefaultDataServiceFactory {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    @Optional() protected config?: DefaultDataServiceConfig
  ) {
    config = config || {};
    httpUrlGenerator.registerHttpResourceUrls(config.entityHttpResourceUrls);
  }

  /**
   * Create a default {EntityCollectionDataService} for the given entity type
   * @param entityName {string} Name of the entity type for this data service
   */
  create<T>(entityName: string): EntityCollectionDataService<T> {
    return new CustomDefaultDataService<T>(
      entityName,
      this.http,
      this.httpUrlGenerator,
      this.config
    );
  }
}
