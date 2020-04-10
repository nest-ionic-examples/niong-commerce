import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { Category } from '../../models/category';
import { PageEvent } from '@angular/material/paginator';
import { debounceFn } from 'debounce-decorator-ts';
import { ActivatedRoute, Router } from '@angular/router';
import { MatxPromptController } from 'angular-material-extended';
import { delay, first, map, switchMap, tap } from 'rxjs/operators';
import { CategoriesService } from '../../services/categories.service';

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
    size: 5,
    number: 1
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private svc: CategoriesService,
              private promptCtrl: MatxPromptController) {
    const filterEntities = (entities, page, size) => {
      const start = size * (page - 1);
      const filteredEntities = entities.filter(e => e.name.includes(this.params.search));
      this.page.total = filteredEntities.length;
      return filteredEntities.slice(start, start + size);
    };
    this.dataSource$ = route.queryParams.pipe(switchMap(params => {
      this.params = {...params};
      delete this.params._refresh;
      let page = Number(params.page);
      page = page && page > 0 ? page : 1;
      let size = Number(params.limit);
      size = size && size > 0 ? size : 5;
      return svc.loaded$.pipe(
        first(),
        switchMap(loaded => loaded
          ? svc.entities$.pipe(delay(10), map(entities => filterEntities(entities, page, size)))
          : svc.getAll().pipe(map(entities => filterEntities(entities, page, size)))
        ),
        tap(() => svc.setLoaded(true))
      )
      // return svc.loaded$.pipe(
      //   first(),
      //   switchMap(loaded => loaded
      //     ? svc.filteredEntities$
      //     : svc.getWithQuery(_params)),
      //   tap(() => svc.setLoaded(true)),
      // );
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
