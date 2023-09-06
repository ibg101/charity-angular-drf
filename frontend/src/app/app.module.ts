import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { NavbarModule } from './navbar/navbar.module';
import { FancyBgModule } from './fancy-bg/fancy-bg.module';
import { NotFoundComponent } from './not-found/not-found.component';
// injection tokens
import { ENVIRONMENT } from './utilities/injection-tokens';
// injection token values/classes
import { environment } from 'src/environments/environment.development';
// interceptors array
import { httpInterceptorProviders } from './shared/http/http-interceptors';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // dependencies
    HttpClientModule,
    // charity
    HomeModule,
    NavbarModule,
    FancyBgModule,
    SharedModule,
  ],
  providers: [
    httpInterceptorProviders,
    // injection tokens
    { provide: ENVIRONMENT, useValue: environment },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
