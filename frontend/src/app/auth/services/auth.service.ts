import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, map } from 'rxjs';
import {
  IUser,
  IUser$, 
  IAuthForm, 
  ISignInForm, 
  ISignUpForm,
  IEnvironment,
  FormOption,
} from 'src/app/custom-types';
import { AbstractApiService } from 'src/app/shared/services/abstract/abstract-api.service';
import { emailPattern, passwordPattern } from 'src/app/utilities/constants';
import { ENVIRONMENT } from 'src/app/utilities/injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractApiService {
  public authForm: IAuthForm = {
    emailControl: new FormControl('', [
      Validators.required,
      Validators.pattern(emailPattern),
    ]),
    usernameControl: new FormControl('', []),
    passwordControl: new FormControl('', [
      Validators.required,
      Validators.pattern(passwordPattern),
    ]),
    confirmPasswordControl: new FormControl('', [
      Validators.required,
    ]),
    rememberMeControl: new FormControl(false),
  }
  public user$: IUser$ = {
    email$: this.authForm.emailControl.valueChanges,
    username$: this.authForm.usernameControl.valueChanges,
    password$: this.authForm.passwordControl.valueChanges,
    confirmPassword$: this.authForm.confirmPasswordControl.valueChanges,
    rememberMe$: this.authForm.rememberMeControl.valueChanges,
  }
  public authToken: string = '';
  private relativePath: string = 'users';
  
  constructor(
    http: HttpClient,
    @Inject(ENVIRONMENT) env: IEnvironment,
  ) {
    super(http, env)
  }

  /**
   * 
   * @param user - define User model Template.
   * @param formOption - select which instance to retrieve by explicitly setting appropriated instanceName: true. 
   * @returns returns Subscription Array in case the need of unsubscribing from them. 
   */
  initInstance(user: IUser, formOption: FormOption): Subscription[] | undefined {
    const email$ = this.user$.email$;
    const username$ = this.user$.username$;
    const password$ = this.user$.password$;
    const confirmPassword$ = this.user$.confirmPassword$;
    const rememberMe$ = this.user$.rememberMe$;

    const subscriptions: Subscription[] = [
      email$.pipe(map((data: string | null) => user.email = data as string)).subscribe(),
      password$.pipe(map((data: string | null) => user.password = data as string)).subscribe(),
      rememberMe$.pipe(map((data: boolean | null) => user.rememberMe = data as boolean)).subscribe(),
    ];

    switch(true) {
      case formOption.signIn:
        return subscriptions;
      case formOption.signUp:
        subscriptions.push(
          username$.pipe(map((data: string | null) => user.username = data as string)).subscribe(),
          confirmPassword$.pipe(map((data: string | null) => user.confirmPassword = data as string)).subscribe(),
        );
        return subscriptions;
      default:
        return undefined;
    }
  }

  getUser(id: number): Observable<IUser | HttpErrorResponse> {
    return this.get(id, this.relativePath);
  }

  getAllUsers(): Observable<IUser | IUser[] | HttpErrorResponse> {
    return this.getAll(this.relativePath);
  }

  authenticate(body: IUser, headers?: HttpHeaders): Observable<IUser | HttpErrorResponse> {
    return this.post(this.relativePath, body, headers ? headers : undefined) as Observable<IUser | HttpErrorResponse>;
  }

  registerUser(body: IUser): Observable<IUser | HttpErrorResponse> {
    const headers = new HttpHeaders()
      .set('require-authtoken', 'false') 
    return this.authenticate(body, headers);
  }

  loginUser(body: IUser): Observable<IUser | HttpErrorResponse> {
    return this.authenticate(body);
  }
}
