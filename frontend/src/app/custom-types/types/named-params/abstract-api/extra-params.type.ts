import { HttpHeaders } from "@angular/common/http"


export type ExtraParams = {
  id?: number,
  headers?: HttpHeaders,
  assignError?: boolean,
  disableCatchError?: boolean,
  httpParam?: string,
  httpParamValue?: string,
}