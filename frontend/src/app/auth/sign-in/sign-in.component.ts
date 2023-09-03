import { Component } from '@angular/core';
import { LinksService } from 'src/app/shared/services/links/links.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(
    public auth: AuthService,
    public link: LinksService,
  ) { }
}
