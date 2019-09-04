import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { UsersPage } from './users.page';
import { MatToolbarModule } from '@angular/material';
import { MatxModule } from 'angular-material-extended';

const routes: Routes = [
  {path: '', component: UsersPage}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatxModule
  ],
  declarations: [UsersPage]
})
export class UsersPageModule {}
