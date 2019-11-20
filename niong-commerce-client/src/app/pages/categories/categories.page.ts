import { Component, OnInit } from '@angular/core';
import { iif, Observable, of } from 'rxjs';
import { Page } from '../../models/page';
import { Category } from '../../models/category';
import { PageEvent } from '@angular/material/paginator';
import { debounceFn } from 'debounce-decorator-ts';
import { ActivatedRoute, Router } from '@angular/router';
import { MatxPromptController } from 'angular-material-extended';
import { delay, first, map, switchMap, tap } from 'rxjs/operators';
import { CategoriesService } from '../../services/categories.service';
import { ifTrue } from 'codelyzer/util/function';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  columns = ['name', 'actions'];

  dataSource$: Observable<Category[]>;

  params: any = {};

  page: Page<Category> = {
    size: 20,
    number: 1
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private svc: CategoriesService,
              private promptCtrl: MatxPromptController) {
    this.dataSource$ = route.queryParams.pipe(/*delay(0), */switchMap(params => {
      this.params = {...params};
      delete this.params._refresh;
      const page = Number(params.page);
      const limit = Number(params.limit);
      const _params = {...params,
        page: (page && page > 0 ? page : 1).toString(),
        limit: (limit && limit > 0 ? limit : 20).toString()
      };
      return svc.loaded$.pipe(
        first(),
        switchMap(loaded => loaded
          ? svc.filteredEntities$
          : svc.getWithQuery(_params)),
        tap(() => svc.setLoaded(true)),
        tap(entities => console.log('entities: ', entities))
      );
      // return this.svc.getWithQuery(_params).pipe(map(_page => {
      // return this.svc.filteredEntities$.pipe(map(entities => {
      //   console.log('entities: ', entities);
      //   this.page.items = entities;
      //   return entities;
      // }));
    }));
  }

  ngOnInit() {
  }

  navigate(params) {
    this.router.navigate([], {relativeTo: this.route, queryParams: params});
  }

  handlePageChange(event: PageEvent) {
    this.navigate({...this.params, page: event.pageIndex + 1, limit: event.pageSize});
  }

  @debounceFn(500)
  search(search: string) {
    this.navigate({search: search || null});
  }

  refresh() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {_refresh: new Date().getTime()},
      skipLocationChange: true
    });
  }

  deleteById(_id: any) {
    this.promptCtrl.prompt({
      message: 'Are you sure you want to delete this item?',
      actions: ['No', {
        text: 'Yes',
        color: 'warn',
        showLoading: true,
        callback: result => this.svc.delete(_id).toPromise().then(() => this.refresh())
      }]
    })
  }

}
