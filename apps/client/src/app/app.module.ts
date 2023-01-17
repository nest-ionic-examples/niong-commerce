import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AgmCoreModule } from "@agm/core";
// import { MatxGmapModule } from "angular-material-extended/matx-gmap";

export function getUserToken() {
  return sessionStorage.getItem('user_token');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    // MatxGmapModule,
    MatMomentDateModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gmap_key,
      libraries: ['places']
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: getUserToken,
        allowedDomains: [environment.baseUrl],
        disallowedRoutes: ['/login', '/sign-up']
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
