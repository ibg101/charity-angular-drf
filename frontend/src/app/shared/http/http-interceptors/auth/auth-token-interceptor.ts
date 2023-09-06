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


@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  public headerName: string = 'require-authtoken';

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has(this.headerName) && req.headers.get(this.headerName) === 'false' ) {
      const modifiedReq = deleteHeader(req, this.headerName);
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