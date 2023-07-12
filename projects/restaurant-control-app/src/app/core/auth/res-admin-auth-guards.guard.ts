import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ResAuthServiceService } from './res-auth-service.service';
@Injectable({
  providedIn: 'root',
})
export class ResAdminAuthGuard implements CanActivate {
  constructor(private auth: ResAuthServiceService, private router: Router) {}
  canActivate() {
    if (this.auth.isResAdminisLoggedIN()) {
      return true;
    }
    this.router.navigate(['/controllersLogin']);
    localStorage.removeItem('ResadminisLoggedIN');
    return false;
  }
}
