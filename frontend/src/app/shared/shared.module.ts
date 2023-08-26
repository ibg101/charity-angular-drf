import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from './ui-components/ui-components.module';
import { InputComponent } from './ui-components/input/input.component';
import { ButtonComponent } from './ui-components/button/button.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiComponentsModule,
  ],
  exports: [
    InputComponent,
    ButtonComponent,
  ]
})
export class SharedModule { }
