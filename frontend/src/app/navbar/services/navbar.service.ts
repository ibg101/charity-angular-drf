import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public innerWidth: number = 0; // to prevent bug with opening burger model and then resizing to md size of screen or wider.
  public activeBurger: boolean = false;

  constructor() { }

  toggleNavBurger() {
    this.activeBurger = !this.activeBurger;
  }
}
