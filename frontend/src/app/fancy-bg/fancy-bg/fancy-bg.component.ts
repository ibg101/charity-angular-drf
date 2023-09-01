import { Component } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';

@Component({
  selector: 'app-fancy-bg',
  templateUrl: './fancy-bg.component.html',
  styleUrls: ['./fancy-bg.component.scss']
})
export class FancyBgComponent {
  constructor(public theme: ThemeService) { }
}
