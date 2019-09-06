import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule, MatSnackBar,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatxModule, MatxPromptComponent } from 'angular-material-extended';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

export function getUserToken() {
  return sessionStorage.getItem('user_token');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    MatxPromptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    MatxModule,
    MatMomentDateModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getUserToken,
        whitelistedDomains: [environment.baseUrl],
        blacklistedRoutes: ['/login', '/sign-up']
      }
    }),
    NgxPermissionsModule.forRoot(),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true, deps: [MatSnackBar, Router]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
