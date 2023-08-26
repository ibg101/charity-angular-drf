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
    if (this.darkMode.systemPrefersDarkMode()) {
      htmlElement.classList.add('tw-dark');
      this.darkMode.mode = 'dark';
    }
    else {
      this.darkMode.mode = 'light';
    }
  }
}
