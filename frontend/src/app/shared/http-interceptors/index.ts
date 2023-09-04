// this file is kinda 'barrel' for serving httpInterceptors

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JsonHeaderInterceptor } from "./json-header-interceptor";


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS,  useClass: JsonHeaderInterceptor, multi: true },
]