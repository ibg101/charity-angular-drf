import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-router-link',
  templateUrl: './router-link.component.html',
  styleUrls: ['./router-link.component.scss']
})
export class RouterLinkComponent {
  @Input() public applyActiveLink: boolean = true;
  @Input() public applyHover: boolean = true;
  @Input() public applyGroup: boolean = false;

  get linkActive(): string {
    return this.applyActiveLink ? 'tw-text-sky-500 dark:tw-text-sky-400' : '';
  }
}
