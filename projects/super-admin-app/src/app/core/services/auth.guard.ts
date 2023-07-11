import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class authGuards implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate() {
0 
    if (this.auth.isSuperADminLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    localStorage.removeItem('isLoggedIN');

    return false;
  }
}
