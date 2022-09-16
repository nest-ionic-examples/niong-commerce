import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatxPromptController } from 'angular-material-extended';
import { delay, map, switchMap } from 'rxjs/operators';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order';
import { PageEvent } from '@angular/material/paginator';
import { debounceFn } from 'debounce-decorator-ts';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage {

  columns = ['customer', 'created', 'actions'];

  dataSource$: Observable<Order[]>;

  params: any = {};

  page: Page<Order> = {
    size: 20,
    number: 1
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productsSvc: OrdersService,
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

  deleteById(_id: any) {
    this.promptCtrl.prompt({
      message: 'Are you sure you want to delete this item?',
      actions: ['No', {
        text: 'Yes',
        color: 'warn',
        showLoading: true,
        callback: result => this.productsSvc.deleteById(_id).toPromise().then(() => this.refresh())
      }]
    })
  }

  filter() {
    this.promptCtrl.prompt({
      title: 'Filter Products',
      inputs: [{
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
