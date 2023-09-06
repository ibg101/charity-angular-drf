import { HttpRequest } from "@angular/common/http";

/**
 *  
 * @returns Updated instance with modified request. 
 */
export function deleteHeader<T>(req: HttpRequest<T>, headerName: string): HttpRequest<T> {
  return req.clone({ headers: req.headers.delete(headerName) });
}