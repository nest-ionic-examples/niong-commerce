import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Page } from '../models/page';
import { map } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';

export abstract class CrudService<T extends { _id?: string }> {
  protected readonly baseUrl: string;

  protected constructor(baseUrl: string, protected http: HttpClient) {
    this.baseUrl = environment.api + baseUrl;
  }

  protected stringifyParams(params) {
    params = Object.assign({}, {limit: 0}, params);
    for (const key of Object.keys(params)) {
      if (typeof params[key] !== 'string' && typeof params[key] !== 'number') {
        params[key] = JSON.stringify(params[key]);
      }
    }
    return params;
  }

  protected mapPage = params => {
    return map((page: any) => {
      if (typeof page !== 'object') {
        page = {data: []};
      }
      page.meta = page.meta || {pagination: {}};
      return {
        number: params.page || 0,
        size: params.limit,
        total: page.meta.pagination.total,
        items: page.data
      };
    });
  };

  findById(id: string) {
    if (!id) { return EMPTY; }
    return this.http.get<T>(this.baseUrl + '/' + id);
  }

  find(params?): Observable<Page<T>> {
    params = this.stringifyParams(params);
    return this.http.get<any>(this.baseUrl, {params})
      .pipe(this.mapPage(params));
  }

  findAll(params?) {
    return this.find(params).pipe(map(itemsPage => itemsPage.items));
  }

  save(item: T | any) {
    if (item._id) {
      const id = item._id;
      delete item._id;
      return this.http.put<T>(this.baseUrl + '/' + id, item);
    } else {
      return this.http.post<T>(this.baseUrl, item);
    }
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
