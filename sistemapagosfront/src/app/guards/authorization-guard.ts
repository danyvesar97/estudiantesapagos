import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Auth } from '../services/auth';
import { Observable } from 'rxjs';
@Injectable()
export class AuthorizationGuard {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isAuthenticated) {
      let requiredRoles = route.data['roles'];
      let userRoles = this.auth.roles;

      for (let role of userRoles) {
        if (requiredRoles.includes(role)) {
          return true;
        }
      }
    }
    return false;
  }
}
