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
