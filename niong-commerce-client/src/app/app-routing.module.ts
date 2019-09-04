import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
  {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  {path: 'sign-up', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule'},
  {path: 'users', loadChildren: './pages/users/users.module#UsersPageModule'},
  {path: 'orders', loadChildren: './pages/orders/orders.module#OrdersPageModule'},
  {path: 'products', loadChildren: './pages/products/products.module#ProductsPageModule'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
