import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ProductFormPage } from './product-form.page';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ValidatorsModule } from 'ngx-validators';
import { MatxBackButtonModule, MatxErrorsModule, MatxInputModule } from 'matx-core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {path: '', component: ProductFormPage}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ValidatorsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatButtonModule,
    MatxBackButtonModule,
    MatxInputModule,
    MatxErrorsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [ProductFormPage]
})
export class ProductFormPageModule {}
