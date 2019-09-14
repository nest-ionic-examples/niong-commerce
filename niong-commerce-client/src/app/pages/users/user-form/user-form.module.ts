import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { UserFormPage } from './user-form.page';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { MatxModule } from 'angular-material-extended';
import { ValidatorsModule } from 'ngx-validators';

const routes: Routes = [
  {path: '', component: UserFormPage}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ValidatorsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatxModule,
    MatButtonModule
  ],
  declarations: [UserFormPage]
})
export class UserFormPageModule {}
