import { Injectable } from '@angular/core';

/**
 * Manages all available API endpoint URL's.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiEndpointService {
  // auth
  public pathUsers: string = 'users';
  public pathLogin: string = `${this.pathUsers}/login`;
  public pathLogout: string = `${this.pathUsers}/logout`;
  public pathTokenValidity: string = `${this.pathUsers}/check-token`;

  constructor() { }
}
