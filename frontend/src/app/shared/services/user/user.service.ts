import { Injectable, Inject } from '@angular/core';
import { ApiEndpointService } from '../api/api-endpoint.service';
import { TokenRequired } from '../../http/headers';
import { AbstractApiService } from '../abstract/abstract-api.service';
import { HttpClient } from '@angular/common/http';
import { ENVIRONMENT } from 'src/app/utilities/constants';
import { IEnvironment, IUser } from 'src/app/custom-types';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractApiService {
  constructor(
    http: HttpClient,
    @Inject(ENVIRONMENT) env: IEnvironment, 
    private api: ApiEndpointService,
    private storage: StorageService,
  ) { 
    super(http, env)
  }

  getUser(): Subscription {
    const headers = TokenRequired.headers;
    return this.get<IUser>(this.api.pathUsers, { headers, httpParam: 'email', httpParamValue: this.email }).subscribe();
  }

  getAllUsers(): Subscription {
    return this.getAll<IUser | IUser[]>(this.api.pathUsers).subscribe();
  }

  clearUserStorage(): void {
    this.storage.clear('token');
    this.storage.clear('email');
  }

  get token(): string | undefined {
    return this.storage.getItem('token');
  }

  get email(): string | undefined {
    return this.storage.getItem('email');
  }
}
