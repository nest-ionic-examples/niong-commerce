import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Page } from '../models/page';
import { map, multicast, shareReplay, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';

export abstract class CrudService<T extends { _id?: string }> {
  protected readonly baseUrl: string;

  protected cache$ = new Map<string, BehaviorSubject<T>>();

  protected queriesCache = new Map<string, {valid: boolean, page$: BehaviorSubject<Page<T>>}>();

  private cloneCachedItem = map<T, T>(item => ({...item}));

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

  findById(id: string): BehaviorSubject<T> {
    if (!id) { return null; }
    if (this.cache$.has(id)) {
      return this.cache$.get(id).pipe(this.cloneCachedItem) as BehaviorSubject<T>;
    } else {
      return this.http.get<T>(this.baseUrl + '/' + id).pipe(
        switchMap(item => {
          const item$ = new BehaviorSubject(item);
          this.cache$.set(id, item$);
          return item$;
        }),
        this.cloneCachedItem
      ) as BehaviorSubject<T>;
    }
  }

  find(params?): BehaviorSubject<Page<T>> {
    const paramsStr = JSON.stringify(params);
    params = this.stringifyParams(params);
    if (this.queriesCache.has(paramsStr) && this.queriesCache.get(paramsStr).valid) {
      return this.queriesCache.get(paramsStr).page$;
    }
    return this.http.get<Page<T>>(this.baseUrl, {params}).pipe(
      switchMap(page => {
        const invalidQueryCache = this.queriesCache.has(paramsStr) && !this.queriesCache.get(paramsStr).valid;
        const page$ = invalidQueryCache
          ? this.queriesCache.get(paramsStr).page$
          : new BehaviorSubject(page);
        page.items.forEach(item => {
          if (!this.cache$.has(item._id)) {
            const item$ = new BehaviorSubject(item);
            this.cache$.set(item._id, item$);
            item$.subscribe(item2 => {
              const index = page.items.findIndex(i => item2._id === i._id);
              page.items[index] = item2;
              page$.next(page);
            })
          }
        });
        if (!invalidQueryCache) this.queriesCache.set(paramsStr, {valid: true, page$});
        else {
          page$.next(page);
          this.queriesCache.get(paramsStr).valid = true;
        }
        return page$;
      })
    ) as BehaviorSubject<Page<T>>;
  }

  findAll(params?) {
    return this.find(params).pipe(map(itemsPage => itemsPage.items));
  }

  save(item: T | any) {
    if (item._id) {
      return this.http.put<T>(this.baseUrl, item).pipe(tap(savedItem => {
        this.cache$.get(savedItem._id).next(savedItem);
      }));
    } else {
      return this.http.post<T>(this.baseUrl, item).pipe(tap(savedItem => {
        this.cache$.set(savedItem._id, new BehaviorSubject(savedItem));
        this.invalidateQueriesCache();
      }));
    }
  }

  private invalidateQueriesCache() {
    this.queriesCache.forEach(val => val.valid = false);
  }

  deleteById(id: string) {
    return this.http.delete(this.baseUrl + '/' + id).pipe(tap(() => this.invalidateQueriesCache()));
  }

  delete(params) {
    return this.http.delete(this.baseUrl, {params}).pipe(tap(() => this.invalidateQueriesCache()));
  }
}
