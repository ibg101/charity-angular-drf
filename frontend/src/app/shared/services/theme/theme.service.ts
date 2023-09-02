import { Injectable } from '@angular/core';
import { bgDarkPath, bgLightPath } from 'src/app/utilities/constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public systemTheme: string = '';
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
    const htmlElement = document.documentElement as HTMLElement;
    if (this.theme === 'dark') {
      htmlElement.classList.add('tw-dark');
    }
    else if (this.theme === 'light') {
      htmlElement.classList.remove('tw-dark')
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

  get theme(): string {
    return sessionStorage.getItem('theme') ?? this.systemTheme; 
  }

  get fill(): boolean {
    return sessionStorage.getItem('fill') === 'true' ? true : false;
  }
}
