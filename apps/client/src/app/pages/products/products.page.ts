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
import { BaseTablePage } from '../../components/base-table.page';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage extends BaseTablePage<Product> {

  columns = ['title', 'image', 'description', 'price', 'created', 'actions'];

  constructor(router: Router,
              route: ActivatedRoute,
              svc: ProductsService,
              promptCtrl: MatxPromptController) {
    super(router, route, svc, promptCtrl);
  }

  filter() {
    this.promptCtrl.prompt({
      title: 'Filter Products',
      inputs: [{
        type: 'number',
        name: 'min_price',
        label: 'Min. Price',
        value: this.params['min_price']
      }, {
        type: 'number',
        name: 'max_price',
        label: 'Max. Price',
        value: this.params['max_price']
      }, {
        type: 'date',
        name: 'created_after',
        label: 'Created After',
        value: this.params['created_after'] && moment(this.params['created_after'], 'Y-M-D') || moment()
      }, {
        type: 'date',
        name: 'created_before',
        label: 'Created Before',
        value: this.params['created_before'] && moment(this.params['created_before'], 'Y-M-D') || moment()
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
