import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LeftPartComponent } from './left-part/left-part.component';
import { RightPartComponent } from './right-part/right-part.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UlListComponent } from './ul-list/ul-list.component';



@NgModule({
  declarations: [
    NavbarComponent,
    LeftPartComponent,
    RightPartComponent,
    UlListComponent,
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
