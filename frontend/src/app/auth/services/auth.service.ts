import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { 
  IAuthForm, 
  ISignInForm, 
  ISignUpForm
} from 'src/app/custom-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authForm: IAuthForm = {
    emailControl: new FormControl('', [
      Validators.required,
    ]),
    usernameControl: new FormControl('', []),
    passwordControl: new FormControl('', [
      Validators.required,
    ]),
    confirmPasswordControl: new FormControl('', [
      Validators.required,
    ]),
    rememberMeControl: new FormControl(false),
  }
  
  constructor() { }
}
