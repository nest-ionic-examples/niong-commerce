import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ProductsPage } from './products.page';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgObjectPipesModule } from 'ngx-pipes';
import { MatxInputModule, MatxMenuButtonModule } from 'matx-core';

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
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    NgObjectPipesModule,
    MatxMenuButtonModule,
    MatxInputModule
  ],
  declarations: [ProductsPage]
})
export class ProductsPageModule {}
