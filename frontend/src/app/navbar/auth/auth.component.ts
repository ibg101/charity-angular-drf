import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LinksService } from 'src/app/shared/services/links/links.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'nav-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(
    public nav: NavbarService,
    public link: LinksService,
    public auth: AuthService,
  ) { }
}
