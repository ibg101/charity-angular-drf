import { AbstractControl } from "@angular/forms";

export interface ISignUpForm {
  email: AbstractControl<string | null>,
  username: AbstractControl<string | null>,
  password: AbstractControl<string | null>,
  confirmPassword: AbstractControl<string | null>,
  rememberMe: AbstractControl<boolean | null>,
}