import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  public systemTheme: string = '';

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

  toggleTheme(): void {
    const htmlElement = document.documentElement as HTMLElement;
    this.defineSystemTheme();
    if (this.theme === 'dark') {
      htmlElement.classList.add('tw-dark');  
    }
    else if (this.theme === 'light') {
      htmlElement.classList.remove('tw-dark')
    } 
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
