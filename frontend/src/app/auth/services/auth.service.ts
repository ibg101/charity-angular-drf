import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { IAuthForm } from 'src/app/custom-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authForm: FormGroup<IAuthForm> = new FormGroup<IAuthForm>({
    email: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    rememberMe: new FormControl(false),
    username: new FormControl(''),
    confirmPassword: new FormControl(''),
  }) 

  constructor() { }

  getControl(controlName: string): FormControl<any> {
    return this.authForm.get(controlName) as FormControl<any>;
  }
}
