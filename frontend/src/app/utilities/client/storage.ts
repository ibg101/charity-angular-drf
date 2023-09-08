import { CookieService } from "ngx-cookie-service";

export function setSessionOrCookie(key: string, value: string, cookie?: CookieService, rememberMe?: boolean): void {
  clearStorage(key, cookie);
  if (cookie && rememberMe) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDay() + 12);
    cookie.set(key, value, expirationDate);
  }
  else if (cookie && rememberMe === undefined) {
    cookie.set(key, value);
  }
  else {
    sessionStorage.setItem(key, value);
  }
  return;
}

export function getItem(key: string, cookie?: CookieService): string | undefined {
  const item = sessionStorage.getItem(key) ?? cookie?.get(key);
  return item;
}

function clearStorage(key: string, cookie?: CookieService): void {
  try {
    // deleting both to prevent any bugs
    cookie?.delete(key);
    sessionStorage.removeItem(key);
  }
  catch(err) { }
  return;
}