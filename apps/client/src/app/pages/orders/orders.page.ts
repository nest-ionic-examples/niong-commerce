import { Component } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { MatxPromptService } from 'matx-core';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order';
import { BaseTablePage } from '../../components/base-table.page';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage extends BaseTablePage<Order> {

  constructor(router: Router,
              route: ActivatedRoute,
              productsSvc: OrdersService,
              promptSvc: MatxPromptService) {
    super(router, route, productsSvc, promptSvc);
  }

  filter() {
    this.promptCtrl.prompt({
      title: 'Filter Orders',
      inputs: [{
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
      actions: [{text: 'Cancel'}, {
        text: 'Filter',
        type: 'submit',
        color: 'primary',
        callback: (result: any) => {
          if (result.created_after) result.created_after = (result.created_after as Moment).format('Y-M-D');
          if (result.created_before) result.created_before = result.created_before.format('Y-M-D');
          this.navigate(result);
        }
      }]
    })
  }
}
