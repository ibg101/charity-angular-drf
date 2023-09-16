import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from './ui-components/ui-components.module';
import { InputComponent } from './ui-components/input/input.component';
import { ButtonComponent } from './ui-components/button/button.component';
import { RouterLinkComponent } from './ui-components/router-link/router-link.component';
import { ErrorComponent } from './ui-components/error/error/error.component';
// add when necessary
// import { UiLineComponent } from './ui-components/ui-line/ui-line.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiComponentsModule,
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    RouterLinkComponent,
    ErrorComponent,
    // UiLineComponent,
  ]
})
export class SharedModule { }
