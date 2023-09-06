import { HttpHeaders } from "@angular/common/http";
import { IHttpHeaders } from "src/app/custom-types";


const key: string = 'require-authtoken';
const value: string = '';

export const RequireToken: IHttpHeaders = {
  key: key,
  value: value,
  headers: new HttpHeaders().set(key, value),
}