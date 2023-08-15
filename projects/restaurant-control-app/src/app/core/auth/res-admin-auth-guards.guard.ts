// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { ResAuthServiceService } from './res-auth-service.service';
// @Injectable({
//   providedIn: 'root',
// })
// export class ResAdminAuthGuard implements CanActivate {
//   constructor(private auth: ResAuthServiceService, private router: Router) {}

//   async canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Promise<boolean | UrlTree> {
//     try {
//       const response = localStorage.getItem('ResadminisLoggedIN');

//       if (response) {
//         console.log(true);
//         return true; //authentication success
//       } else {
//         this.router.navigate(['/controllersLogin']);
//         return false; //authentication failed
//       }
//     } catch (error) {
//       console.error('An error occurred during authentication:', error); //authentication error hand/ing
//       this.router.navigate(['/controllersLogin']);
//       return false;
//     }
//   }
// }


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class ResAdminAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('ResadminisLoggedIN');
  

    const loginRoute = '/controllersLogin';

    if (state.url !== loginRoute && token === null) {
      this.router.navigate(['/controllersLogin']);
      return false;
    } else if (state.url === loginRoute && token !== null) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  } 
};
