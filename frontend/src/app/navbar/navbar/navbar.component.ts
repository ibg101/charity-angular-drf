import { Component } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { LinksService } from 'src/app/shared/services/links/links.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    public nav: NavbarService,
    public link: LinksService,
  ) { }
}
