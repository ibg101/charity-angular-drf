import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { NavbarModule } from './navbar/navbar.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { FancyBgComponent } from './fancy-bg/fancy-bg.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    FancyBgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // dependencies
    HttpClientModule,
    // charity
    HomeModule,
    NavbarModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
