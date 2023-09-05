import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, map } from 'rxjs';
import {
  IUser,
  IUser$, 
  IAuthForm, 
  ISignInForm, 
  ISignUpForm,
  IEnvironment,
  SignInForm,
  SignUpForm,
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
   * @param form - specify the current FormGroup instance.
   * @param user - specify the current User Template Model. 
   * @param formOption - specify the Form to define the correct instance. 
   * @returns returns Subscription in case the need of unsubscribing from it.
   */
  initInstance(form: FormGroup<SignInForm> | FormGroup<SignUpForm>, user: IUser, formOption: FormOption): Subscription | undefined {
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
        const signIn$ = (form as FormGroup<SignInForm>).valueChanges;
        return signIn$
          .pipe(
            map(instance => {
              initGeneric(instance);
            })
          )
          .subscribe();
      case isSignUp:
        const signUp$ = (form as FormGroup<SignUpForm>).valueChanges;
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
        throw new Error('Invalid type of Form specified.');
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
