import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { isAuthenticatedGuard } from '../shared/guards/is-authenticated.guard';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [isAuthenticatedGuard()] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
