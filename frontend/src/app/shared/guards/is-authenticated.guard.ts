import { inject } from "@angular/core";
import { 
  ActivatedRouteSnapshot, 
  CanActivateFn, 
  RouterStateSnapshot 
} from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";


export function isAuthenticatedGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(AuthService).isAuthenticated;
  }
}