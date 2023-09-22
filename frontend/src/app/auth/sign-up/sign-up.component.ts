import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LinksService } from 'src/app/shared/services/links/links.service';
import { AuthService } from '../services/auth.service';
import { ISignUpForm, IUser } from 'src/app/custom-types';
import { passwordsMatch } from '../validators/passwords-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  public signUpForm: FormGroup<ISignUpForm> = new FormGroup<ISignUpForm>({
    email: this.auth.authForm.emailControl,
    username: this.auth.authForm.usernameControl,
    password: this.auth.authForm.passwordControl,
    confirmPassword: this.auth.authForm.confirmPasswordControl,
    rememberMe: this.auth.authForm.rememberMeControl,
  }, {
    validators: [passwordsMatch()],
  })
  public user: IUser = {
    id: 0,
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  }

  constructor(
    public auth: AuthService,
    public link: LinksService,
  ) { }

  ngOnInit(): void {
    this.auth.initInstance(this.signUpForm, this.user, { isSignUp: true });
  }

  ngOnDestroy(): void {
    this.auth.cleanUpError();
  }

  signUp(): void {
    this.auth.registerUser(this.user);
    return;
  }
}
