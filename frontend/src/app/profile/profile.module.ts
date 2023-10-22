import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './edit/edit.component';
import { MainProfileComponent } from './main/main.component';


@NgModule({
  declarations: [
    ProfileComponent,
    MainProfileComponent,
    EditProfileComponent,    
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
  ]
})
export class ProfileModule { }
