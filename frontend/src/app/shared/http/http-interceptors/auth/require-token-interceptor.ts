import { 
  HttpEvent, 
  HttpHandler, 
  HttpInterceptor, 
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { AuthOnly, NoTokenRequired } from "../../headers";


@Injectable()
export class RequireTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has(NoTokenRequired.key) && req.headers.has(AuthOnly.key)) {
      const modifiedReq = req.clone({
        setHeaders: { 'Authorization': `Token ${this.auth.token}` }
      });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}