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
* (current setup of backend doesn't support passing rememberMe property) 
*/
@Injectable()
export class RememberMeInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<IUser>, next: HttpHandler): Observable<HttpEvent<any>> {
    delete req.body?.rememberMe;
    const modifiedBody = { ...req.body };
    const modifiedReq = req.clone({ body: modifiedBody });
    return next.handle(modifiedReq);
  }
}