import { 
  HttpEvent, 
  HttpHandler, 
  HttpInterceptor, 
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";


export class JsonHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders: { 'content-type': 'application/json' }
    });
    return next.handle(modifiedReq);
  }
}