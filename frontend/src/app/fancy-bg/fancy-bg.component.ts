import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fancy-bg',
  templateUrl: './fancy-bg.component.html',
  styleUrls: ['./fancy-bg.component.scss']
})
export class FancyBgComponent {
  @Input() public position: string | string[] = [];

  get top(): boolean {
    return this.definePos('top');
  }

  get bottom(): boolean {
    return this.definePos('bottom');
  }

  get left(): boolean {
    return this.definePos('left');
  }

  get right(): boolean {
    return this.definePos('right');
  }

  private definePos(pos: string): boolean {
    if (this.position.length > 1) {
      for (let i of this.position) {
        return i === pos ? true : false;
      }
    }
    // only two ==
    return this.position == pos ? true : false;
  }
}
