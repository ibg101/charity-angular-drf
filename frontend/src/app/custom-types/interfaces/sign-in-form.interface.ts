import { AbstractControl } from "@angular/forms";

export interface ISignInForm {
  email: AbstractControl<string | null>,
  password: AbstractControl<string | null>,
  rememberMe: AbstractControl<boolean | null>,
}