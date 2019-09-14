import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ProductsPage } from './products.page';
import {
  MatButtonModule,
  MatIconModule,
  MatPaginatorModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { MatxModule } from 'angular-material-extended';
import { NgObjectPipesModule } from 'ngx-pipes';

const routes: Routes = [
  {path: '', component: ProductsPage},
  {path: 'add', loadChildren: () => import('./product-form/product-form.module').then(m => m.ProductFormPageModule)},
  {
    path: 'edit/:id',
    loadChildren: () => import('./product-form/product-form.module').then(m => m.ProductFormPageModule)
  },

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatxModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    NgObjectPipesModule
  ],
  declarations: [ProductsPage]
})
export class ProductsPageModule {}
