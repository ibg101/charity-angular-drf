import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LinksService } from 'src/app/shared/services/links/links.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'nav-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(
    public link: LinksService,
    public auth: AuthService,
    public user: UserService,
  ) { }
}
