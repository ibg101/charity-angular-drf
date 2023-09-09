import { Component, OnInit } from '@angular/core';
import { ThemeService } from './shared/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'westrong';

  constructor(
    private theme: ThemeService,
  ) { }

  // toggling Dark mode, depending on system preferences
  ngOnInit(): void {
    this.theme.toggleTheme();
  }
}
