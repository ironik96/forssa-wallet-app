import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { BackendService } from './backend.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  get isLoggedIn(): boolean {
    return this.backend.user != null;
  }

  constructor(private router: Router, private backend: BackendService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (route.url[0]?.path === 'login') {
      if (this.backend.user) this.backend.signout();
      return true;
    }
    if (this.isLoggedIn) return true;
    else this.router.navigate(['login']);
    return true;
  }
}
