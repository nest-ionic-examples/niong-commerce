import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatxSidenavMenuService } from 'matx-core';
import { AuthService } from './services/auth.service';
import { loggedIn$ } from './services/auth.subjects';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  appPages = [
    {title: 'Home', url: '/home', icon: 'home'},
    {title: 'Products', url: '/products', icon: 'business_center', permissions: ['ADMIN', 'SELLER']},
    {title: 'Orders', url: '/orders', icon: 'shopping_cart', permissions: ['ADMIN', 'SELLER', 'CUSTOMER']},
    {title: 'Users', url: '/users', icon: 'supervised_user_circle', permissions: ['ADMIN']},
    {title: 'Categories', url: '/categories', icon: 'category', permissions: ['ADMIN']},
  ];

  loggedIn$ = loggedIn$;

  constructor(private breakpointObserver: BreakpointObserver,
              public sideNavSvc: MatxSidenavMenuService,
              public authSvc: AuthService) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ]).subscribe(result => {
      sideNavSvc.isMobile = result.matches;
      sideNavSvc.opened = !sideNavSvc.isMobile;
    })
  }

  logout() {
    this.authSvc.logout();
    this.sideNavSvc.opened = false;
  }

}
