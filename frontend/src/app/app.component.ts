import { Component, OnInit } from '@angular/core';
import { ThemeService } from './shared/services/theme/theme.service';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'westrong';

  constructor(
    private theme: ThemeService,
    private auth: AuthService,
  ) { }

  // toggling Dark mode, depending on system preferences
  ngOnInit(): void {
    this.theme.toggleTheme();
    this.auth.checkTokenValidity();
  }
}
