import { HttpHeaders } from "@angular/common/http";
import { IHttpHeaders } from "src/app/custom-types";


const headerName: string = "auth-only";
const headerValue: string = ""; 

export const AuthOnly: IHttpHeaders = {
  key: headerName,
  value: headerValue,
  headers: new HttpHeaders().set(headerName, headerValue), 
}