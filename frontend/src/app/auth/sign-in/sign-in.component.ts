import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LinksService } from 'src/app/shared/services/links/links.service';
import { AuthService } from '../services/auth.service';
import { ISignInForm } from 'src/app/custom-types';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  public signInForm: FormGroup<ISignInForm> = new FormGroup<ISignInForm>({
    email: this.auth.authForm.emailControl,
    password: this.auth.authForm.passwordControl,
    rememberMe: this.auth.authForm.rememberMeControl,
  })

  constructor(
    public auth: AuthService,
    public link: LinksService,
  ) { }
}
