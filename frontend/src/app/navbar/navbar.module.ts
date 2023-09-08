import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LeftPartComponent } from './left-part/left-part.component';
import { RightPartComponent } from './right-part/right-part.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UlListComponent } from './ul-list/ul-list.component';
import { AuthComponent } from './auth/auth.component';



@NgModule({
  declarations: [
    NavbarComponent,
    LeftPartComponent,
    RightPartComponent,
    UlListComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    NavbarComponent,
  ]
})
export class NavbarModule { }
