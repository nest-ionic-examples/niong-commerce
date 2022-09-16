import { Component } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { MatxPromptController } from 'angular-material-extended';
import { UsersService } from '../../services/users.service';
import * as moment from 'moment';
import { BaseTablePage } from '../../components/base-table.page';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage extends BaseTablePage<User> {

  columns = ['username', 'name', 'email', 'role', 'created', 'actions'];

  constructor(router: Router,
              route: ActivatedRoute,
              productsSvc: UsersService,
              promptCtrl: MatxPromptController) {
    super(router, route, productsSvc, promptCtrl)
  }

  filter() {
    this.promptCtrl.prompt({
      title: 'Filter Users',
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
          if (result.created_after) result.created_after = result.created_after.format('Y-M-D');
          if (result.created_before) result.created_before = result.created_before.format('Y-M-D');
          this.navigate(result);
        }
      }]
    })
  }
}
