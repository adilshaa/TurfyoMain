
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class diningGuardGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');
 

    const loginRoute = '/diningLogin';
    // const signupRoute = '/designer_signup';

    if (state.url !== loginRoute && token === null) {
      this.router.navigate(['/diningLogin']);
      localStorage.removeItem('token');
      
      return false;
    } else if (state.url === loginRoute && token !== null) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
};