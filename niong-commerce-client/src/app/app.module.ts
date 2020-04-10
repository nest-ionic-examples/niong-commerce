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
  MatSidenavModule,
  MatSnackBar,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { MatxModule } from 'angular-material-extended';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AgmCoreModule } from "@agm/core";
import { MatxGmapModule } from "angular-material-extended/matx-gmap";
import { DefaultDataServiceConfig, DefaultDataServiceFactory, EntityDataModule, HttpUrlGenerator } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CustomDefaultDataServiceFactory } from './services/custom-default-data.service';

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
    MatxModule,
    MatxGmapModule,
    MatMomentDateModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gmap_key,
      libraries: ['places']
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: getUserToken,
        whitelistedDomains: [environment.baseUrl],
        blacklistedRoutes: ['/login', '/sign-up']
      }
    }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
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
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true, deps: [MatSnackBar, Router]},
    {provide: DefaultDataServiceConfig, useValue: {root: environment.api, timeout: 3000}},
    {provide: DefaultDataServiceFactory, useClass: CustomDefaultDataServiceFactory, deps: [HttpClient, HttpUrlGenerator, DefaultDataServiceConfig]},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(eds: EntityDataService, categoriesDSvc: CategoriesDataService) {
  //   eds.registerService('Category', categoriesDSvc);
  // }
}
