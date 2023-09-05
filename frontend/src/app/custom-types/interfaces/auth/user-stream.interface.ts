import { Observable } from "rxjs";

export interface IUser$ {
  email$: Observable<string | null>,
  username$: Observable<string | null>,
  password$: Observable<string | null>,
  confirmPassword$: Observable<string | null>,
  rememberMe$: Observable<boolean | null>,
}