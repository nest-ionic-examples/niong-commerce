import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatxMenuButtonModule } from 'matx-core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

const routes: Routes = [
  {path: '', component: HomePage}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatxMenuButtonModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
