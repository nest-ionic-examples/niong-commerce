import { ActivatedRoute, Params, Router } from '@angular/router';
import { Page } from '../models/page';
import { MatxPromptController } from 'angular-material-extended';
import { delay, map, switchMap, tap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { debounceFn } from 'debounce-decorator-ts';
import { Observable } from 'rxjs';
import { CrudService } from '../services/crud.service';

export abstract class BaseTablePage<T> {

  dataSource$: Observable<T[]>;

  params: {
    $size?: string,
    $page?: string,
    $search?: string,
    _refresh?: string,
  } & Record<string, string>= {};

  page: Page<T> = {
    size: 20,
    number: 1
  };

  protected constructor(protected router: Router,
                        protected route: ActivatedRoute,
                        protected crudSvc: CrudService<T>,
                        protected promptCtrl: MatxPromptController) {
    this.dataSource$ = route.queryParams.pipe(delay(0), switchMap(params => {
      this.params = {...params};
      delete this.params['_refresh'];
      return this.crudSvc.find(this.params).pipe(map(_page => {
        this.page = _page;
        return _page.items ?? [];
      }));
    }));
  }

  navigate(params: Params) {
    this.router.navigate([], {relativeTo: this.route, queryParams: params});
  }

  handlePageChange(event: PageEvent) {
    delete this.params.$page;
    delete this.params.$size;
    this.navigate({
      ...(event.pageIndex !== 0 && {$page: event.pageIndex + 1}),
      ...(event.pageSize !== 20 && {$size: event.pageSize})
    });
  }

  @debounceFn(500)
  search(search: string) {
    this.navigate({$search: search || null});
  }

  refresh() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {_refresh: new Date().getTime()},
      skipLocationChange: true
    });
  }

  deleteById(_id: string) {
    this.promptCtrl.prompt({
      message: 'Are you sure you want to delete this item?',
      actions: ['No', {
        text: 'Yes',
        color: 'warn',
        showLoading: true,
        callback: () => this.crudSvc.deleteById(_id).pipe(tap(() => this.refresh()))
      }]
    })
  }

}
