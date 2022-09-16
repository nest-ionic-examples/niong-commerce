import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { delay, map, switchMap } from 'rxjs/operators';
import { MatxPromptController } from 'angular-material-extended';
import * as moment from 'moment';
import { Moment } from 'moment';
import { debounceFn } from 'debounce-decorator-ts';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage {

  columns = ['title', 'image', 'description', 'price', 'created', 'actions'];

  dataSource$: Observable<Product[]>;

  params: any = {};

  page: Page<Product> = {
    size: 20,
    number: 1
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productsSvc: ProductsService,
              private promptCtrl: MatxPromptController) {
    this.dataSource$ = route.queryParams.pipe(delay(0), switchMap(params => {
      this.params = {...params};
      delete this.params._refresh;
      const page = Number(params['page']);
      const limit = Number(params['limit']);
      const _params = Object.assign({}, params, {
        page: page && page > 0 ? page : 1,
        limit: limit && limit > 0 ? limit : 20
      });
      return this.productsSvc.find(_params).pipe(map(_page => {
        this.page = _page;
        return _page.items ?? [];
      }));
    }));
  }

  navigate(params: Params) {
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

  deleteById(_id: string) {
    this.promptCtrl.prompt({
      message: 'Are you sure you want to delete this item?',
      actions: ['No', {
        text: 'Yes',
        color: 'warn',
        showLoading: true,
        callback: () => this.productsSvc.deleteById(_id).toPromise().then(() => this.refresh())
      }]
    })
  }

  filter() {
    this.promptCtrl.prompt({
      title: 'Filter Products',
      inputs: [{
        type: 'number',
        name: 'min_price',
        label: 'Min. Price',
        value: this.params.min_price
      }, {
        type: 'number',
        name: 'max_price',
        label: 'Max. Price',
        value: this.params.max_price
      }, {
        type: 'date',
        name: 'created_after',
        label: 'Created After',
        value: this.params.created_after && moment(this.params.created_after, 'Y-M-D') || moment()
      }, {
        type: 'date',
        name: 'created_before',
        label: 'Created Before',
        value: this.params.created_before && moment(this.params.created_before, 'Y-M-D') || moment()
      }],
      actions: ['Cancel', {
        text: 'Filter',
        type: 'submit',
        color: 'primary',
        callback: result => {
          if (result.created_after) result.created_after = (result.created_after as Moment).format('Y-M-D');
          if (result.created_before) result.created_before = result.created_before.format('Y-M-D');
          this.navigate(result);
        }
      }]
    })
  }
}
