import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LinksService } from 'src/app/shared/services/links/links.service';
import { AuthService } from '../services/auth.service';
import { ISignInForm, IUser } from 'src/app/custom-types';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup<ISignInForm> = new FormGroup<ISignInForm>({
    email: this.auth.authForm.emailControl,
    password: this.auth.authForm.passwordControl,
    rememberMe: this.auth.authForm.rememberMeControl,
  })
  public user: IUser = {
    id: 0,
    email: '',
    password: '',
    rememberMe: false,
  }

  constructor(
    public auth: AuthService,
    public link: LinksService,
  ) { }

  ngOnInit(): void {
    this.auth.initInstance(this.signInForm, this.user, { isSignIn: true });
  }

  signIn(): void {
    this.auth.loginUser(this.user);
    return;
  }
}
