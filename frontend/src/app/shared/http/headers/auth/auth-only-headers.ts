import { HttpHeaders } from "@angular/common/http";
import { IHttpHeaders } from "src/app/custom-types";


const key: string = 'auth-only';
const value: string = ''; 

export const AuthOnly: IHttpHeaders = {
  key: key,
  value: value,
  headers: new HttpHeaders().set(key, value) 
}