import { Component } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { MatxPromptController } from 'angular-material-extended';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order';
import { BaseTablePage } from '../../components/base-table.page';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage extends BaseTablePage<Order> {

  columns = ['customer', 'created', 'actions'];

  constructor(router: Router,
              route: ActivatedRoute,
              productsSvc: OrdersService,
              promptCtrl: MatxPromptController) {
    super(router, route, productsSvc, promptCtrl);
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
