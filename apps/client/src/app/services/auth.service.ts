import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxPermissionsService } from 'ngx-permissions';
import { MatxPromptService } from 'matx-core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { currentUser$ } from './auth.subjects';
import { User } from '../models/user';
import { catchError, tap } from 'rxjs/operators';
import { firstValueFrom, NEVER } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private redirectUrl = '';

  constructor(private router: Router,
              private http: HttpClient,
              private snackBar: MatSnackBar,
              private permissionsSvc: NgxPermissionsService,
              private promptCtrl: MatxPromptService,
              jwtSvc: JwtHelperService,
              route: ActivatedRoute) {
    route.queryParams.subscribe(queryParams => this.redirectUrl = queryParams['redirectUrl']);

    if (jwtSvc.tokenGetter() && !jwtSvc.isTokenExpired()) {
      this.refreshCurrentUser();
    } else {
      currentUser$.next(null);
    }

    currentUser$.subscribe(currentUser => {
      if (!currentUser) {
        sessionStorage.removeItem('user_token');
        permissionsSvc.flushPermissions();
      }
    });
  }

  async login(credentials: { username: string, password: string }) {
    const result = await this.http.post<{ token: string }>(environment.api + 'login', credentials).toPromise();
    sessionStorage.setItem('user_token', result?.token ?? '');
    await this.refreshCurrentUser();
    this.router.navigateByUrl(this.redirectUrl || '/home');
  }

  logout() {
    currentUser$.next(null);
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }

  signUp(credentials: {username: string, password: string, confirmPassword: string}) {
    return this.http.post(environment.api + 'sign-up', credentials);
  }

  private refreshCurrentUser() {
    return firstValueFrom(this.http.get<User>(environment.api + 'me').pipe(
      catchError(err => {
        // this.router.navigateByUrl('/login')
        console.log('err: ', err);
        currentUser$.next(null);
        return NEVER;
      }),
      tap(me => {
      this.permissionsSvc.addPermission(me.role);
      currentUser$.next(me);
    })
    ));
  }

}
