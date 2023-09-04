import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LinksService } from 'src/app/shared/services/links/links.service';
import { AuthService } from '../services/auth.service';
import { ISignUpForm, IUser } from 'src/app/custom-types';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public signUpForm: FormGroup<ISignUpForm> = new FormGroup<ISignUpForm>({
    email: this.auth.authForm.emailControl,
    username: this.auth.authForm.usernameControl,
    password: this.auth.authForm.passwordControl,
    confirmPassword: this.auth.authForm.confirmPasswordControl,
    rememberMe: this.auth.authForm.rememberMeControl,
  })
  public user: IUser = this.auth.defineInstance({ signUp: true }) as IUser;

  constructor(
    public auth: AuthService,
    public link: LinksService,
  ) { }

  signUp(): void {
    this.auth.registerUser(this.user).subscribe();
  }
}
