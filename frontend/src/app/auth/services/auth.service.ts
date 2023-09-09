import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
import { AuthOnly, NoTokenRequired } from 'src/app/shared/http/headers';
import { AbstractApiService } from 'src/app/shared/services/abstract/abstract-api.service';
import { LinksService } from 'src/app/shared/services/links/links.service';
import { setSessionOrCookie, getItem } from 'src/app/utilities/client/storage';
import { 
  emailPattern, 
  passwordPattern, 
  ENVIRONMENT, 
  invalidFormOption,
} from 'src/app/utilities/constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractApiService {
  public authForm: IAuthForm = {
    emailControl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(emailPattern),
      ],
      asyncValidators: []
    }),
    usernameControl: new FormControl('', {
      validators: [],
    }),
    passwordControl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(passwordPattern),
      ],
    }),
    confirmPasswordControl: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    rememberMeControl: new FormControl(false),
  }
  public user$: IUser$ = {
    email$: this.authForm.emailControl.valueChanges,
    username$: this.authForm.usernameControl.valueChanges,
    password$: this.authForm.passwordControl.valueChanges,
    confirmPassword$: this.authForm.confirmPasswordControl.valueChanges,
    rememberMe$: this.authForm.rememberMeControl.valueChanges,
  }
  private relativePath: string = 'users';
  
  constructor(
    http: HttpClient,
    @Inject(ENVIRONMENT) env: IEnvironment,
    private cookie: CookieService,
    private link: LinksService,
    private router: Router,
  ) {
    super(http, env)
  }

  /**
   * 
   * @param form - specify the current FormGroup instance.
   * @param user - specify the current User Template Model. 
   * @param formOption - specify the Form to define the correct instance. 
   * @returns returns Subscription in case the need of unsubscribing from it.
   */
  initInstance(form: FormGroup<ISignInForm> | FormGroup<ISignUpForm>, user: IUser, formOption: FormOption): Subscription | undefined {    
    this.clearControls(form, formOption);
    // this inner func cant be used as a standalone, so placed inside outer method.
    const initGeneric = (
        instance: Partial<{
          email: string | null,
          password: string | null,
          rememberMe: boolean | null,
      }>
    ): void => {
      user.email = instance.email as string;
      user.password = instance.password as string;
      user.rememberMe = instance.rememberMe as boolean;
    };
    const isSignIn: boolean = form instanceof FormGroup && formOption.isSignIn as boolean;
    const isSignUp: boolean = form instanceof FormGroup && formOption.isSignUp as boolean;

    switch(true) {
      // Using SignInForm | SignUpForm classes instead of interfaces to be able to access current form instance.
      case isSignIn:
        const signIn$ = (form as FormGroup<ISignInForm>).valueChanges;
        return signIn$
          .pipe(
            map(instance => {
              initGeneric(instance);
            })
          )
          .subscribe();
      case isSignUp:
        const signUp$ = (form as FormGroup<ISignUpForm>).valueChanges;
        return signUp$
          .pipe(
            map(instance => {
              initGeneric(instance);
              user.username = instance.username as string;
              user.confirmPassword = instance.confirmPassword as string;
            })
          )
          .subscribe();
      default:
        throw new Error(invalidFormOption);
    }
  }

  /**
   * Required function due to:
   * 
   * Since Auth is using Separated User Instances, 
   * switching between forms can produce bug with emptiness of the form while performing a requests.
   */
  clearControls(form: FormGroup<ISignInForm> | FormGroup<ISignUpForm>, formOption: FormOption): void {
    const genericControls: {
      email: string | null,
      password: string | null,
      rememberMe: boolean | null,
    } = { email: null, password: null, rememberMe: null };

    switch(true) {
      case formOption.isSignIn:
        (form as FormGroup<ISignInForm>).setValue(genericControls);
        return;
      case formOption.isSignUp:
        (form as FormGroup<ISignUpForm>).setValue({ ...genericControls, username: null, confirmPassword: null });
        return;
      default:
        throw new Error(invalidFormOption);
    }
  }

  getUser(user_id: number): Observable<IUser | HttpErrorResponse> {
    return this.get(user_id, this.relativePath);
  }

  getAllUsers(): Observable<IUser | IUser[] | HttpErrorResponse> {
    return this.getAll(this.relativePath);
  }

  /**
   * Can be specified addtional HttpHeaders key-value pair. 
   * 
   * @param isLogin if true, changes the relativePath to 'auth'. 
   */
  authenticate(user: IUser, isLogin?: boolean, headersName?: string, headersValue?: string): Subscription {
    const relativePath = isLogin ? 'auth' : this.relativePath;
    // since headersValue can be '' use only headersName in comparison
    const headers = headersName ? AuthOnly.headers.append(headersName, headersValue as string) : AuthOnly.headers;
    const rememberMe = user.rememberMe;
    return (this.post<IUser>(relativePath, user, headers) as Observable<IUser>)
      .pipe(
        map(
          (response: IUser) => {
            response.token ? setSessionOrCookie('token', response.token, this.cookie, rememberMe) : undefined;
            response.username ? setSessionOrCookie('username', response.username, this.cookie, rememberMe) : undefined;
            this.error ?? this.router.navigateByUrl(this.link.home); 
            return response;
          }
        )
       )
      .subscribe();
  }

  registerUser(user: IUser): Subscription {
    return this.authenticate(user, false, NoTokenRequired.key, NoTokenRequired.value);
  }

  loginUser(user: IUser): Subscription {
    return this.authenticate(user, true);
  }

  get token(): string | undefined {
    return getItem('token', this.cookie);
  }

  get username(): string | undefined {
    return getItem('username', this.cookie);
  }
}
