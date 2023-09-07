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
* Excludes RememberMe property from the req.body object, since there's no need to pass this field yet
* (current setup of backend doesn't support passing rememberMe property).
*
* Renames Angular's camelCase confirmPassword to DRF's snake_case confirm_password.
*/
@Injectable()
export class AuthBodyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<IUser>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has(AuthOnly.key)) {
      const confirm_password = req.body?.confirmPassword;
      delete req.body?.confirmPassword; // renaming it to confirm_password
      delete req.body?.rememberMe;
      const modifiedBody = { ...req.body, confirm_password: confirm_password };
      const modifiedReq = req.clone({ body: modifiedBody });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}