import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { 
  Observable, 
  Subscription, 
  catchError, 
  finalize,
  retry, 
  map,
} from 'rxjs';
import {
  IUser,
  IUser$, 
  IAuthForm, 
  ISignInForm, 
  ISignUpForm,
  IEnvironment,
  FormOption,
} from 'src/app/custom-types';
import { AuthOnly, NoTokenRequired, TokenRequired } from 'src/app/shared/http/headers';
import { AbstractApiService } from 'src/app/shared/services/abstract/abstract-api.service';
import { ApiEndpointService } from 'src/app/shared/services/api/api-endpoint.service';
import { LinksService } from 'src/app/shared/services/links/links.service';
import { 
  emailPattern, 
  passwordPattern, 
  ENVIRONMENT, 
  invalidFormOption,
} from 'src/app/utilities/constants';
import { StorageService } from './storage.service';


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
  
  constructor(
    http: HttpClient,
    @Inject(ENVIRONMENT) env: IEnvironment,
    private cookie: CookieService,
    private storage: StorageService,
    private link: LinksService,
    private api: ApiEndpointService,
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

  getUser(): Subscription {
    const headers = TokenRequired.headers;
    return this.get(this.api.pathUsers, { headers, httpParam: 'email', httpParamValue: this.email }).subscribe();
  }

  getAllUsers(): Subscription {
    return this.getAll(this.api.pathUsers).subscribe();
  }

  /**
   * Can be specified addtional HttpHeaders key-value pair. 
   * 
   * @param isLogin if true, changes the relativePath to 'auth'. 
   */
  authenticate(user: IUser, isLogin?: boolean, headersName?: string, headersValue?: string): Subscription {
    const relativePath = isLogin ? this.api.pathLogin : this.api.pathUsers;
    // since headersValue can be '' use only headersName in comparison
    const headers = headersName ? AuthOnly.headers.append(headersName, headersValue as string) : AuthOnly.headers;

    const setAuthStorage = (response: IUser): void => {
      response.token ? this.cookie.set('token', response.token) : undefined;
      response.email ? this.cookie.set('email', response.email) : undefined;
    };

    return (this.post<IUser>(relativePath, user, { headers }) as Observable<IUser>)
      .pipe(
        // retrying 3 times in case of error
        retry(this.retryAttempts),
        map(
          (response: IUser) => {
            setAuthStorage(response);
            return response;
          }
        ),
       )
      .subscribe({
        complete: () => {
          this.link.redirectHome();
        }
      });
  }

  registerUser(user: IUser): Subscription {
    return this.authenticate(user, false, NoTokenRequired.key, NoTokenRequired.value);
  }

  loginUser(user: IUser): Subscription {
    return this.authenticate(user, true);
  }

  logoutUser(): Subscription {
    const clearAuthStorage = (): void => {
      this.storage.clear('token');
      this.storage.clear('email');
    };

    return this.post(this.api.pathLogout, this.emailBody, { assignError: false })
      .pipe(
        retry(this.retryAttempts),
      )
      .subscribe({
        complete: () => {
          clearAuthStorage();
          this.link.redirectHome();
        }
      });
  }

  /**
   * Sets isAuthenticated to true if token is valid, otherwise - false.
   */
  checkTokenValidity(): void {
    if (this.emailBody) {
      const subscription = this.post(this.api.pathTokenValidity, this.tokenBody, { 
        headers: AuthOnly.headers, 
        disableCatchError: true,
      })
        .pipe(
          retry(this.retryAttempts),
          catchError((err: HttpErrorResponse): never => {
            this.logoutUser();
            this.throwError(err);
          }),
          finalize(() => { subscription.unsubscribe() })
        )
        .subscribe();
    }
    return;
  }

  get token(): string | undefined {
    return this.storage.getItem('token');
  }

  get email(): string | undefined {
    return this.storage.getItem('email');
  }

  /**
   * Defines whether User is authenticated or not by accessing it's token from Client's Storage.
   */
  get isAuthenticated(): boolean {
    return this.token ? true : false;
  }

  /**
   * Simplified version of user body, that contains only email field or null.
   */
  get emailBody(): { email: string } | null {
    const body = this.email ? { email: this.email } : null;
    return body;
  }

  /**
   * Simplified version of body, that contains only token or null.
   */
  get tokenBody(): { key: string } | null {
    const body = this.token ? { key: this.token } : null;
    return body;
  }
}
