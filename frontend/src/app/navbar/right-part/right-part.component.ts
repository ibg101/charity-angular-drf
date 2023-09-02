import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';
import { NavbarService } from '../services/navbar.service';
import { LinksService } from 'src/app/shared/services/links/links.service';

@Component({
  selector: 'nav-right-part',
  templateUrl: './right-part.component.html',
  styleUrls: ['./right-part.component.scss']
})
export class RightPartComponent implements OnInit, OnDestroy {
  constructor (
    public nav: NavbarService,
    public link: LinksService,
    public theme: ThemeService,
    ) { }

  ngOnInit(): void {
    // 
  }

  ngOnDestroy(): void {
    // 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.nav.innerWidth = window.innerWidth;
  }

  toggleManuallyTheme(): void {
    const htmlElement = document.documentElement as HTMLElement;
    htmlElement.classList.toggle('tw-dark') ?? console.error('An unexpected error occurred.');
    if (htmlElement.classList.contains('tw-dark')) {
      this.theme.setTheme('dark');
    }
    else {
      this.theme.setTheme('light');
    }
    this.theme.setFill('true');
  }
}
