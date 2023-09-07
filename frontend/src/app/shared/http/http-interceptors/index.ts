// this file is kinda GLOBAL 'barrel' for serving httpInterceptors.
// for adding interceptors locally, consider adding them directly to the appropriated module.

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JsonHeaderInterceptor } from "./generic/json-header-interceptor";
import { RequireTokenInterceptor } from "./auth/require-token-interceptor";
import { ModifyAuthBodyInterceptor } from "./auth/modify-body-interceptor";
import { CleanerInterceptor } from "./cleaner-interceptor";


// while adding new interceptors, please CONSIDER their ORDER
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS,  useClass: JsonHeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: RequireTokenInterceptor,  multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ModifyAuthBodyInterceptor, multi: true },
  // provide this interceptor at the end.
  { provide: HTTP_INTERCEPTORS, useClass: CleanerInterceptor, multi: true },
];