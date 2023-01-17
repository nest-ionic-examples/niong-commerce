import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SignUpPage } from './sign-up.page';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ValidatorsModule } from 'ngx-validators';
import { MatxBackButtonModule, MatxErrorsModule, MatxInputModule } from 'matx-core';

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
    MatButtonModule,
    ValidatorsModule,
    MatxBackButtonModule,
    MatxInputModule,
    MatxErrorsModule
  ],
  declarations: [SignUpPage]
})
export class SignUpPageModule {}
