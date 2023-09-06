import { 
  HttpEvent, 
  HttpHandler, 
  HttpInterceptor, 
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { deleteHeader } from "src/app/utilities/http/delete-header";
import { RequireToken } from "../../headers";


@Injectable()
export class RequireTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has(RequireToken.key)) {
      const modifiedReq = deleteHeader(req, RequireToken.key);
      return next.handle(modifiedReq);
    }
    else {
      const modifiedReq = req.clone({
        setHeaders: { 'Authorization': `Token ${this.auth.authToken}` }
      });
      return next.handle(modifiedReq);
    }
  }
}