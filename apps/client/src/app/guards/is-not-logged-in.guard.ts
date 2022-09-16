import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { loggedIn$ } from '../services/auth.subjects';

@Injectable({
  providedIn: 'root'
})
export class IsNotLoggedInGuard implements CanActivate  {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    return loggedIn$.pipe(map(loggedIn => {
      if (loggedIn) {
        this.router.navigateByUrl('/dashboard', {replaceUrl: true});
      }
      return !loggedIn;
    }));
  }
}
