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

  findById(id: string) {
    if (!id) { return EMPTY; }
    return this.http.get<T>(this.baseUrl + '/' + id);
  }

  find(params?): Observable<Page<T>> {
    params = this.stringifyParams(params);
    return this.http.get<any>(this.baseUrl, {params});
  }

  findAll(params?) {
    return this.find(params).pipe(map(itemsPage => itemsPage.items));
  }

  save(item: T | any) {
    if (item._id) {
      return this.http.put<T>(this.baseUrl, item);
    } else {
      return this.http.post<T>(this.baseUrl, item);
    }
  }

  deleteById(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  delete(params) {
    return this.http.delete(this.baseUrl, {params});
  }
}
