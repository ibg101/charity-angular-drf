import { inject } from "@angular/core";
import { 
  ActivatedRouteSnapshot, 
  CanActivateFn, 
  Router, 
  RouterStateSnapshot, 
  UrlTree
} from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";
import { LinksService } from "../services/links/links.service";


export function isAuthenticatedGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const link = inject(LinksService);

    return auth.isAuthenticated ? true : router.parseUrl(link.auth.signIn);
  }
}