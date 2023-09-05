import { 
  HttpEvent, 
  HttpHandler, 
  HttpInterceptor, 
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";


@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('require-authtoken') && req.headers.get('require-authtoken') === 'false' ) {
      return next.handle(req);  
    }
    else {
      const modifiedReq = req.clone({
        setHeaders: { 'Authorization': `Token ${this.auth.authToken}` }
      });
      return next.handle(modifiedReq);
    }
  }
}