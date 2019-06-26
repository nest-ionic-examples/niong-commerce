import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { MatxModule } from 'angular-material-extended';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatxModule,
    MatButtonModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
