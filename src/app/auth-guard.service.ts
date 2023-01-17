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
  // you would usually put this in it's own service and not access it directly!
  // this is just for the sake of the demo.
  get isLoggedIn(): boolean {
    return this.backend.user != null;
  }

  constructor(private router: Router, private backend: BackendService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.isLoggedIn) return true;
    else this.router.navigate(['login']);
    return false;
  }
}
