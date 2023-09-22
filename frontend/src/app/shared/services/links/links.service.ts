// Global service for centralizing all links for the routes
// Please, while considering adding a new route, add the link here first.

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthLink } from 'src/app/custom-types';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  // nested paths
  public auth: IAuthLink = {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    passwordReset: '/auth/password-reset',
  }
  // simple paths
  public home: string = '/';
  public posts: string = '/posts';
  public sponsor: string = '/sponsor';
  public about: string = '/about';

  constructor(
    private router: Router
  ) { }

  redirectHome(): void {
    this.router.navigateByUrl(this.home);
    return;
  }
}
