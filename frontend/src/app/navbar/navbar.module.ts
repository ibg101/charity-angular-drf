import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LeftPartComponent } from './left-part/left-part.component';
import { RightPartComponent } from './right-part/right-part.component';



@NgModule({
  declarations: [
    NavbarComponent,
    LeftPartComponent,
    RightPartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
  ]
})
export class NavbarModule { }
