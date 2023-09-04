import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  IUser, 
  IAuthForm, 
  ISignInForm, 
  ISignUpForm,
  IEnvironment,
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
  public authToken: string = '';
  private relativePath: string = 'users';
  
  constructor(
    http: HttpClient,
    @Inject(ENVIRONMENT) env: IEnvironment,
  ) {
    super(http, env)
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
      .set('Require-AuthToken', 'false') 
    return this.authenticate(body, headers);
  }

  loginUser(body: IUser): Observable<IUser | HttpErrorResponse> {
    return this.authenticate(body);
  }
}
