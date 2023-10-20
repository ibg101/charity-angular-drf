import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterLinkComponent } from './router-link/router-link.component';
import { UiLineComponent } from './ui-line/ui-line.component';
import { ErrorComponent } from './error/error.component';
import { ModalComponent } from './modal/components/modal.component';



@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    RouterLinkComponent,
    ErrorComponent,
    UiLineComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    InputComponent, 
    ButtonComponent,
    RouterLinkComponent,
    ErrorComponent,
    UiLineComponent,
    ModalComponent,
  ]
})
export class UiComponentsModule { }
