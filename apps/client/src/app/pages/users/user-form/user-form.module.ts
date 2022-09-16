import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { UserFormPage } from './user-form.page';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatxModule } from 'angular-material-extended';
import { ValidatorsModule } from 'ngx-validators';
// import { MatxGmapModule } from "angular-material-extended/matx-gmap";

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
    MatButtonModule,
    // MatxGmapModule
  ],
  declarations: [UserFormPage]
})
export class UserFormPageModule {}
