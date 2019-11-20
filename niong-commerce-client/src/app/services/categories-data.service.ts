import { Injectable } from '@angular/core';
import { DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Category } from '../models/category';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Page } from '../models/page';

@Injectable({providedIn: 'root'})
export class CategoriesDataService extends DefaultDataService<Category> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, config: DefaultDataServiceConfig) {
    super('Category', http, httpUrlGenerator, config);

    this.entityUrl = this.entitiesUrl;
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.entitiesUrl, {params: {size: '0'}});
  }

  getWithQuery(queryParams: QueryParams | string): Observable<Category[]> {
    const qParams = typeof queryParams === 'string'
      ? {fromString: queryParams}
      : {fromObject: queryParams};
    const params = new HttpParams(qParams);
    return this.http.get<Page<Category>>(this.entitiesUrl, {params}).pipe(map(page => page.items));
  }
}
