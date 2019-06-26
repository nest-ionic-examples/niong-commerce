import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatxSidenavMenuController } from 'angular-material-extended';
import { AuthService } from './services/auth.service';
import { loggedIn$ } from './app.subjects';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  appPages = [
    {title: 'Home', url: '/home', icon: 'home'},
  ];

  loggedIn$ = loggedIn$;

  constructor(private breakpointObserver: BreakpointObserver,
              public sideNavCtrl: MatxSidenavMenuController,
              public authSvc: AuthService) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ]).subscribe(result => {
      sideNavCtrl.isMobile = result.matches;
      sideNavCtrl.opened = !sideNavCtrl.isMobile;
    })
  }

  logout() {
    this.authSvc.logout();
    this.sideNavCtrl.opened = false;
  }

}
