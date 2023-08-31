import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-router-link',
  templateUrl: './router-link.component.html',
  styleUrls: ['./router-link.component.scss']
})
export class RouterLinkComponent {
  @Input() public applyActiveLink: boolean = true;
  @Input() public applyHover: boolean = true;

  get linkActive(): string {
    return this.applyActiveLink ? 'tw-text-sky-500 dark:tw-text-sky-400' : '';
  }
}
