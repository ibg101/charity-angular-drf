import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'westrong';

  // toggling Dark mode, depending on system preferences
  ngOnInit(): void {
    const htmlElement = document.documentElement as HTMLElement;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      htmlElement.classList.add('tw-dark');
    }
  }
}
