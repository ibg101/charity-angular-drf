import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { DarkModeService } from 'src/app/shared/services/dark-mode/dark-mode.service';

@Component({
  selector: 'nav-right-part',
  templateUrl: './right-part.component.html',
  styleUrls: ['./right-part.component.scss']
})
export class RightPartComponent implements OnInit, OnDestroy {
  public innerWidth: number = 0;
  public activeBurger: boolean = false;

  constructor (public darkMode: DarkModeService) {}

  ngOnInit(): void {
    // 
  }

  ngOnDestroy(): void {
    // 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.innerWidth = window.innerWidth;
  }

  toggleManuallyTheme(): void {
    const htmlElement = document.documentElement as HTMLElement;
    htmlElement.classList.toggle('tw-dark') ?? console.error('An unexpected error occurred.');
    if (htmlElement.classList.contains('tw-dark')) {
      this.darkMode.setTheme('dark');
    }
    else {
      this.darkMode.setTheme('light');
    }
    this.darkMode.setFill('true');
  }

  toggleNavBurger(): void {
    this.activeBurger = !this.activeBurger;
  }
}
