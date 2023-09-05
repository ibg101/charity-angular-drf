import { AbstractControl } from "@angular/forms";

export class SignInForm {
  email: AbstractControl<string | null>;
  password: AbstractControl<string | null>;
  rememberMe: AbstractControl<boolean | null>;

  constructor(
    email: AbstractControl<string | null>,
    password: AbstractControl<string | null>,
    rememberMe: AbstractControl<boolean | null>,
  ) {
    this.email = email;
    this.password = password;
    this.rememberMe = rememberMe;
  }
}