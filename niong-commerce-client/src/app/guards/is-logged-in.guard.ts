import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { loggedIn$ } from '../services/auth.subjects';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return loggedIn$.pipe(tap(loggedIn => {
      if (!loggedIn) {
        this.router.navigate(['login'], {replaceUrl: true, queryParams: {redirectUrl: state.url}});
      }
    }));
  }
}
