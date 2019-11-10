import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesPage } from './categories.page';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatxModule } from 'angular-material-extended';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { NgObjectPipesModule } from 'ngx-pipes';

const routes: Routes = [
  {path: '', component: CategoriesPage}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatxModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    NgObjectPipesModule
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
