import { Component, OnDestroy, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/shared/services/dark-mode/dark-mode.service';

@Component({
  selector: 'nav-right-part',
  templateUrl: './right-part.component.html',
  styleUrls: ['./right-part.component.scss']
})
export class RightPartComponent implements OnInit, OnDestroy {
  constructor (public darkMode: DarkModeService) {}

  ngOnInit(): void {
    // 
  }

  ngOnDestroy(): void {
    // 
  }

  toggleDarkMode(): void {
    const htmlElement = document.documentElement as HTMLElement;
    htmlElement.classList.toggle('tw-dark') ?? console.error('An unexpected error occurred.');
    if (htmlElement.classList.contains('tw-dark')) {
      this.darkMode.mode = 'dark'
    }
    else {
      this.darkMode.mode = 'light'
    }
    this.darkMode.fill = true;
  }
}
