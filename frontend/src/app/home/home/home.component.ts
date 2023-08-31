import { Component } from '@angular/core';
import { LinksService } from 'src/app/shared/services/links/links.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public link: LinksService) { }
}
