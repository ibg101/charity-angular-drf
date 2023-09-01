import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FancyBgComponent } from './fancy-bg/fancy-bg.component';



@NgModule({
  declarations: [
    FancyBgComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
  ],
  exports: [
    FancyBgComponent,
  ]
})
export class FancyBgModule { }
