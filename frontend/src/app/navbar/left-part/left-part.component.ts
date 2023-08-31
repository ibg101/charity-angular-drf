import { Component } from '@angular/core';
import { LinksService } from 'src/app/shared/services/links/links.service';

@Component({
  selector: 'nav-left-part',
  templateUrl: './left-part.component.html',
  styleUrls: ['./left-part.component.scss']
})
export class LeftPartComponent {
  constructor(public link: LinksService) { }
}
