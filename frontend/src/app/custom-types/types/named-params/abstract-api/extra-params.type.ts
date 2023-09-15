import { HttpHeaders } from "@angular/common/http"


export type ExtraParams = {
  headers?: HttpHeaders,
  assignError?: boolean,
  disableCatchError?: boolean,
}