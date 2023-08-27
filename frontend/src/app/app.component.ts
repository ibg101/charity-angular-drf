import { Component, OnInit } from '@angular/core';
import { DarkModeService } from './shared/services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'westrong';

  constructor(private darkMode: DarkModeService) { }

  // toggling Dark mode, depending on system preferences
  ngOnInit(): void {
    const htmlElement = document.documentElement as HTMLElement;
    // a bit tricky logic
    if (this.darkMode.theme === 'dark' || this.darkMode.systemPrefersDarkMode()) {
      htmlElement.classList.add('tw-dark');
      this.darkMode.systemTheme = 'dark';
    }
    // placing here || !this.darkMode.systemPrefersDarkMode() causes bug
    if (this.darkMode.theme === 'light') {
      htmlElement.classList.remove('tw-dark');
      this.darkMode.systemTheme = 'light';
    }
  }
}
