import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { OrdersPage } from './orders.page';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgObjectPipesModule } from 'ngx-pipes';
import { MatButtonModule } from '@angular/material/button';
import { MatxInputModule, MatxMenuButtonModule } from 'matx-core';

const routes: Routes = [
  {path: '', component: OrdersPage}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    NgObjectPipesModule,
    MatButtonModule,
    MatxMenuButtonModule,
    MatxInputModule
  ],
  declarations: [OrdersPage]
})
export class OrdersPageModule {}
