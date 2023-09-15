import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(
    private cookie: CookieService,
  ) { }

  setCookie(key: string, value: string): void {
    this.cookie.set(key, value);
    return;
  }

  /**
   * Retrieves an item from user storage (session / cookie) with appropriated key. 
   * @param cookie - optional, when it's need to retrieve an item from cookie storage. 
   */
  getItem(key: string): string | undefined {
    const item = sessionStorage.getItem(key) ?? this.cookie.get(key);
    return item;
  }

  clear(key: string): void {
    // deleting both items to prevent any related storage bugs
    try {
      sessionStorage.removeItem(key);
      this.cookie.delete(key);
    }
    catch(err) { }
  }
}
