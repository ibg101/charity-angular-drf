import { 
  HttpEvent, 
  HttpHandler, 
  HttpInterceptor, 
  HttpRequest 
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUser } from "src/app/custom-types";
import { AuthOnly } from "../../headers";

/**
*
* Renames Angular's camelCase fields to DRF's snake_case.
*/
@Injectable()
export class AuthBodyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<IUser>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has(AuthOnly.key)) {
      const { confirmPassword, rememberMe, ...rest } = req.body!;
      const modifiedBody = { 
        ...rest, 
        confirm_password: confirmPassword,
        remember_me: rememberMe,
      };
      const modifiedReq = req.clone({ body: modifiedBody });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}