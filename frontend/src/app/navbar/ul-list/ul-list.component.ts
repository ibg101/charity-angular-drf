import { Component, Input } from '@angular/core';
import { LinksService } from 'src/app/shared/services/links/links.service';

@Component({
  selector: 'nav-ul-list',
  templateUrl: './ul-list.component.html',
  styleUrls: ['./ul-list.component.scss']
})
export class UlListComponent {
  @Input() className: string = '';

  constructor(public link: LinksService) { }
}
