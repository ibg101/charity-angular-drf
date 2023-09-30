import { HttpHeaders } from "@angular/common/http";
import { IHttpHeaders } from "src/app/custom-types";


const headerName: string = "auth-only";
const headerValue: string = ""; 

/**
 * When specified, automatically includes Auth Token, however can be used only for Auth purposes.
 * 
 * In need to include Token, please consider using TokenRequired headers that simply include Auth Token.
 */
export const AuthOnly: IHttpHeaders = {
  key: headerName,
  value: headerValue,
  headers: new HttpHeaders().set(headerName, headerValue), 
}