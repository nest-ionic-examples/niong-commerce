import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { UsersPage } from './users.page';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgObjectPipesModule } from 'ngx-pipes';
import { MatxInputModule, MatxMenuButtonModule } from 'matx-core';
import { MatxTableModule } from 'matx-table';

const routes: Routes = [
  {path: '', component: UsersPage},
  {path: 'add', loadChildren: () => import('./user-form/user-form.module').then(m => m.UserFormPageModule)},
  {path: 'edit/:id', loadChildren: () => import('./user-form/user-form.module').then(m => m.UserFormPageModule)},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    NgObjectPipesModule,
    MatxInputModule,
    MatxMenuButtonModule,
    MatxTableModule
  ],
  declarations: [UsersPage]
})
export class UsersPageModule {}
