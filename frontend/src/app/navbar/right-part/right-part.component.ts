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
}
