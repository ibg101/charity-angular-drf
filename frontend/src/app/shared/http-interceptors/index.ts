// this file is kinda GLOBAL 'barrel' for serving httpInterceptors.
// for adding interceptors locally, consider adding them directly to the appropriated module.

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JsonHeaderInterceptor } from "./json-header-interceptor";


// while adding new interceptors, please CONSIDER their ORDER
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS,  useClass: JsonHeaderInterceptor, multi: true },
]