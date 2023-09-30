import { 
  HttpEvent, 
  HttpHandler, 
  HttpInterceptor, 
  HttpRequest 
} from "@angular/common/http";
import { Observable } from "rxjs";
import { deleteHeader } from "src/app/utilities/http/delete-header";
import { AuthOnly, NoTokenRequired, TokenRequired } from "../headers";
import { Injectable } from "@angular/core";


/**
 * Removes all unnecessary Headers / ...
 */
@Injectable()
export class CleanerInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = deleteHeader(req, [AuthOnly.key, TokenRequired.key, NoTokenRequired.key]);
    return next.handle(modifiedReq);
  }
}