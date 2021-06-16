import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatxModule } from 'angular-material-extended';

const routes: Routes = [
  {path: '', component: HomePage}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatxModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
