import { Injectable, Inject } from '@angular/core';
import { ApiEndpointService } from '../api/api-endpoint.service';
import { TokenRequired } from '../../http/headers';
import { AbstractApiService } from '../abstract/abstract-api.service';
import { HttpClient } from '@angular/common/http';
import { ENVIRONMENT } from 'src/app/utilities/constants';
import { 
  IEnvironment, 
  IUser 
} from 'src/app/custom-types';
import { 
  Subscription, 
  map 
} from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractApiService {
  public instance: IUser = {
    id: 0,
    email: '',
    username: '',
    donated: 0,
    collected: 0,
  };

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
    return this.get<IUser>(this.api.pathUsers, { headers, httpParam: 'email', httpParamValue: this.email })
      .pipe(
        map((response: IUser) => {
          return this.initInstance(response);
        })
      )
      .subscribe();
  }

  initInstance(response: IUser): IUser {
    this.instance = response;
    return response;
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
