import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { currentUser$ } from '../services/auth.subjects';

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  private async showError(error) {
    this.snackBar.open(error, 'OK', {duration: 5000, panelClass: 'mat-warn'});
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(catchError(error => {
      if (error.statusText === 'Unknown Error') {
        this.showError('An unknown error has occurred, please check your internet connection.');
      }
      if (error.error) {
        if (error.error.errors) {
          const errors = Object.values(error.error.errors);
          if (errors.length === 1) {
            this.showError(errors[0]);
          } else {
            this.showError(errors.join('\n'));
          }
        } else if (error.error.message) {
          if (error.error.message === 'No session found') {
            sessionStorage.removeItem('user_token');
            currentUser$.next(null);
            if (this.router.url !== '/') {
              this.router.navigate(['login'], {replaceUrl: true, queryParams: {redirectUrl: this.router.url}});
            }
          }
          this.showError(error.error.message);
        }
      } else if (error.message) {
        this.showError(error.message);
      } else {
        this.showError(error);
      }
      return throwError(error);
    }));
  }
}
