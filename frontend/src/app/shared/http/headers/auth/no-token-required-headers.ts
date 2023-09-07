import { HttpHeaders } from "@angular/common/http";
import { IHttpHeaders } from "src/app/custom-types";


const headerName: string = "no-token-required";
const headerValue: string = "";

export const NoTokenRequired: IHttpHeaders = {
  key: headerName,
  value: headerValue,
  headers: new HttpHeaders().set(headerName, headerValue),
}