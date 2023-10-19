import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { isAuthenticatedGuard } from '../shared/guards/is-authenticated.guard';
import { EditProfileComponent } from './edit/edit.component';

const routes: Routes = [
  { 
    path: 'profile', 
    component: ProfileComponent, 
    canActivate: [isAuthenticatedGuard()],
    children: [
      { path: 'edit', component: EditProfileComponent }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
