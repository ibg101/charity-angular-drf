import { HttpRequest } from "@angular/common/http";

/**
 *  
 * @returns Updated instance with modified request. 
 */
export function deleteHeader<T>(req: HttpRequest<T>, headersName: string | string[]): HttpRequest<T> {
  if (headersName.length > 1) {
    // creating cloned req instance to provide deleting headers with iteration (otherwise deletes only the last headerName in the list)
    let modifiedReq = req.clone({ ...req });
    for (let headerName of headersName) {
      modifiedReq = modifiedReq.clone({ headers: modifiedReq.headers.delete(headerName) });
    }
    return modifiedReq;
  }
  return req.clone({ headers: req.headers.delete(headersName as string) });
}