import { 
  HttpEvent, 
  HttpHandler, 
  HttpInterceptor, 
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class JsonHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders: { 'content-type': 'application/json' }
    });
    return next.handle(modifiedReq);
  }
}