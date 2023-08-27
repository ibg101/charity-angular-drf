import { Component, Input } from '@angular/core';

@Component({
  selector: 'nav-ul-list',
  templateUrl: './ul-list.component.html',
  styleUrls: ['./ul-list.component.scss']
})
export class UlListComponent {
  @Input() className: string = '';
}
