import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { MatxPromptService } from 'matx-core';
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
              promptSvc: MatxPromptService) {
    super(router, route, svc, promptSvc);
  }

}
