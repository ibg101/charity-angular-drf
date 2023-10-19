import { 
  HttpEvent, 
  HttpHandler, 
  HttpInterceptor, 
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "src/app/shared/services/user/user.service";
import { AuthOnly, NoTokenRequired, TokenRequired } from "../../headers";


@Injectable()
export class RequireTokenInterceptor implements HttpInterceptor {
  constructor(private user: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has(NoTokenRequired.key) && req.headers.has(TokenRequired.key) || req.headers.has(AuthOnly.key)) {
      const modifiedReq = req.clone({
        setHeaders: { 'Authorization': `Token ${this.user.token}` }
      });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}