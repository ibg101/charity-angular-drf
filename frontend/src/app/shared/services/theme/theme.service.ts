import { Injectable } from '@angular/core';
import { bgDarkPath, bgLightPath } from 'src/app/utilities/constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public systemTheme: string = '';
  public darkThemeClass: string = 'tw-dark';
  public htmlElement = document.documentElement as HTMLElement;
  public bgDarkPath: string = bgDarkPath;
  public bgLightPath: string = bgLightPath;
  
  constructor() { }

  systemPrefersDarkMode(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  defineSystemTheme(): void {
    if (this.systemPrefersDarkMode()) {
      this.systemTheme = 'dark';
    }
    else {
      this.systemTheme = 'light';
    }
  }

  // cant be used as standalone function. ! use in pair with defineSystemTheme
  toggleClassTheme(): void {
    const htmlElement = this.htmlElement;
    
    if (this.theme === 'dark') {
      htmlElement.classList.add(this.darkThemeClass);
    }
    else if (this.theme === 'light') {
      htmlElement.classList.remove(this.darkThemeClass);
    } 
  }

  toggleTheme(): void {
    this.defineSystemTheme();
    this.toggleClassTheme();
  }    
  
  setTheme(theme: string): void {
    sessionStorage.setItem('theme', theme);
  }

  setFill(value: string): void {
    sessionStorage.setItem('fill', value);
  }

  /**
   * Eliminates the bug, that occurs when user manually cleans the sessionStorage and navigates to a different component,
   * without refreshing the page.
   */
  doThemeCheck(): void {
    const htmlElement = this.htmlElement; // improving performance by using const
    const theme = this.theme;
    const darkThemeApplied: boolean = htmlElement.classList.contains('tw-dark');

    if (theme === 'light' && darkThemeApplied) {
      htmlElement.classList.remove(this.darkThemeClass);
    }
    else if (theme === 'dark' && !darkThemeApplied) {
      htmlElement.classList.add(this.darkThemeClass);
    }
  }

  get theme(): string {
    return sessionStorage.getItem('theme') ?? this.systemTheme; 
  }

  get fill(): boolean {
    return sessionStorage.getItem('fill') === 'true' ? true : false;
  }
}
