import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { MatxPromptController } from 'angular-material-extended';
import { CategoriesService } from '../../services/categories.service';
import { BaseTablePage } from '../../components/base-table.page';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage extends BaseTablePage<Category> {

  columns = ['name', 'actions'];

  constructor(router: Router,
              route: ActivatedRoute,
              svc: CategoriesService,
              promptCtrl: MatxPromptController) {
    super(router, route, svc, promptCtrl);
  }

}
