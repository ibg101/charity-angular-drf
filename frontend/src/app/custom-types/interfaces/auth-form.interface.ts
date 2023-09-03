import { AbstractControl } from "@angular/forms";

export interface IAuthForm {
  email: AbstractControl<string | null>,
  password: AbstractControl<string | null>,
  rememberMe: AbstractControl<boolean | null>,
  username?: AbstractControl<string | null>,
  confirmPassword?: AbstractControl<string | null>,
}