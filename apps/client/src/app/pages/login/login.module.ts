import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatxErrorsModule, MatxInputModule, MatxMenuButtonModule } from 'matx-core';

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
    MatButtonModule,
    MatxMenuButtonModule,
    MatxInputModule,
    MatxErrorsModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
