import { AbstractControl } from "@angular/forms";

export class SignUpForm {
  email: AbstractControl<string | null>;
  username: AbstractControl<string | null>;
  password: AbstractControl<string | null>;
  confirmPassword: AbstractControl<string | null>;
  rememberMe: AbstractControl<boolean | null>;

  constructor(
    email: AbstractControl<string | null>,
    username: AbstractControl<string | null>,
    password: AbstractControl<string | null>,
    confirmPassword: AbstractControl<string | null>,
    rememberMe: AbstractControl<boolean | null>,
  ) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.rememberMe = rememberMe;
  }
}