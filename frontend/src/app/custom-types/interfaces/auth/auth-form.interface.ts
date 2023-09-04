import { FormControl } from "@angular/forms";

export interface IAuthForm {
  emailControl: FormControl<string | null>,
  usernameControl: FormControl<string | null>,
  passwordControl: FormControl<string | null>,
  confirmPasswordControl: FormControl<string | null>,
  rememberMeControl: FormControl<boolean | null>,
}