import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { CategoryFormPage } from './category-form.page';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatxModule } from 'angular-material-extended';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {path: '', component: CategoryFormPage}
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
  declarations: [CategoryFormPage]
})
export class CategoryFormPageModule {}
