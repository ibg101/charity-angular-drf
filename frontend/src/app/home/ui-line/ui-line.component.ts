import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-line',
  templateUrl: './ui-line.component.html',
  styleUrls: ['./ui-line.component.scss']
})
export class UiLineComponent {
  @Input() color: string = '';
  @Input() height: string = '';

  get lineColor(): string {
    // default color is set.
    return this.color ? this.color : 'tw-stroke-slate-900 dark:tw-stroke-white';
  }

  get lineHeight(): string {
    // default height is set.
    return this.height ? this.height : 'tw-h-8';
  }

  get lineHeightY(): string {
    const height: number = Number(this.lineHeight.slice(5));
    return `${height * 10}`;
  }
}
