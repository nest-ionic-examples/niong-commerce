import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)},
  {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)},
  {path: 'sign-up', loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)},
  {path: '', canActivate: [IsLoggedInGuard], children: [
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersPageModule),
        canActivate: [NgxPermissionsGuard],
        data: {permissions: {only: ['ADMIN'], redirectTo: 'home'}}
      },
      {
        path: 'orders', loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersPageModule),
        canActivate: [NgxPermissionsGuard],
        data: {permissions: {only: ['ADMIN', 'SELLER', 'CUSTOMER'], redirectTo: 'home'}}
      },
      {
        path: 'products',
        loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsPageModule),
        canActivate: [NgxPermissionsGuard],
        data: {permissions: {only: ['ADMIN', 'SELLER'], redirectTo: 'home'}}
      },
    ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
