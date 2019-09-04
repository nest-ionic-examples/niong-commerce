import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ProductsPage } from './products.page';
import {
  MatButtonModule,
  MatIconModule,
  MatPaginatorModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { MatxModule } from 'angular-material-extended';

const routes: Routes = [
  {path: '', component: ProductsPage},
  {path: 'add', loadChildren: './product-form/product-form.module#ProductFormPageModule'},
  {path: 'edit/:id', loadChildren: './product-form/product-form.module#ProductFormPageModule'},

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
    MatPaginatorModule
  ],
  declarations: [ProductsPage]
})
export class ProductsPageModule {}
