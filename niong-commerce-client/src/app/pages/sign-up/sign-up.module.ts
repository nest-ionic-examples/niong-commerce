import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SignUpPage } from './sign-up.page';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { MatxModule } from 'angular-material-extended';
import { ValidatorsModule } from 'ngx-validators';

const routes: Routes = [
  {
    path: '',
    component: SignUpPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatxModule,
    MatButtonModule,
    ValidatorsModule
  ],
  declarations: [SignUpPage]
})
export class SignUpPageModule {}
