import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatxMenuButtonModule } from 'matx-core';

const routes: Routes = [
  {path: '', component: HomePage}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatxMenuButtonModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
