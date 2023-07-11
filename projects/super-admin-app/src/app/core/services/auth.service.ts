import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SuperAdminEmitter } from '../../shared/emitters/emitters';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  isSuperADminLoggedIn() {
    console.log(!!localStorage.getItem('isLoggedIN'));
    SuperAdminEmitter.Emitter.emit(true);
    return !!localStorage.getItem('isLoggedIN');
  }
}
