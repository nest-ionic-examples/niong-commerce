import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { OrdersPage } from './orders.page';
import { MatToolbarModule } from '@angular/material';
import { MatxModule } from 'angular-material-extended';

const routes: Routes = [
  {path: '', component: OrdersPage}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatxModule
  ],
  declarations: [OrdersPage]
})
export class OrdersPageModule {}
