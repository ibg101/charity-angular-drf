import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'nav-right-part',
  templateUrl: './right-part.component.html',
  styleUrls: ['./right-part.component.scss']
})
export class RightPartComponent implements OnInit, OnDestroy {
  constructor () {}

  ngOnInit(): void {
    // 
  }

  ngOnDestroy(): void {
    // 
  }

  toggleDarkMode(): void {
    const htmlElement = document.documentElement as HTMLElement;
    htmlElement.classList.toggle('tw-dark') ?? console.error('An unexpected error occurred.');
  }
}
