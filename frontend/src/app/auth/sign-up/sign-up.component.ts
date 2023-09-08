import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LinksService } from 'src/app/shared/services/links/links.service';
import { AuthService } from '../services/auth.service';
import { ISignUpForm, IUser } from 'src/app/custom-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup<ISignUpForm> = new FormGroup<ISignUpForm>({
    email: this.auth.authForm.emailControl,
    username: this.auth.authForm.usernameControl,
    password: this.auth.authForm.passwordControl,
    confirmPassword: this.auth.authForm.confirmPasswordControl,
    rememberMe: this.auth.authForm.rememberMeControl,
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
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.auth.initInstance(this.signUpForm, this.user, { isSignUp: true });
  }

  signUp(): void {
    this.auth.registerUser(this.user);
    this.router.navigateByUrl(this.link.home);
    return;
  }
}
