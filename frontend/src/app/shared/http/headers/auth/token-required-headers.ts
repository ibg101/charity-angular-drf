import { HttpHeaders } from "@angular/common/http";
import { IHttpHeaders } from "src/app/custom-types";


const headerName: string = 'token-required';
const headerValue: string = '';

/**
 * Simply include Auth Token to request's headers.
 */
export const TokenRequired: IHttpHeaders = {
  key: headerName,
  value: headerValue,
  headers: new HttpHeaders().set(headerName, headerValue),
} 