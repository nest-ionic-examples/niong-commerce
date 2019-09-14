import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { OrdersPage } from './orders.page';
import { MatToolbarModule } from '@angular/material';
import { MatxModule } from 'angular-material-extended';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgObjectPipesModule } from 'ngx-pipes';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {path: '', component: OrdersPage}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatxModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    NgObjectPipesModule,
    MatButtonModule
  ],
  declarations: [OrdersPage]
})
export class OrdersPageModule {}
