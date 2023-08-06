import { CanActivateFn } from '@angular/router';

export const posGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PosAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    try {
      const response = localStorage.getItem('token');
      if (response) {
        console.log(true);
        return true; //authentication success
      } else {
        this.router.navigate(['/poslogin']);
        return false; //authentication failed
      }
    } catch (error) {
      console.error('An error occurred during authentication:', error); //authentication error hand/ing
      this.router.navigate(['/poslogin']);
      return false;
    }
  }
}
