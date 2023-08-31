import { Component } from '@angular/core';
import { LinksService } from '../shared/services/links/links.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor(public link: LinksService) { }
}
