import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SuperAdminEmitter } from '../../shared/emitters/emitters';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isAuthenticate!: Boolean;
  constructor(private router: Router) { }

  isSuperADminLoggedIn(): any {
    console.log(!!localStorage.getItem("isLoggedIN"));
    SuperAdminEmitter.Emitter.emit(true);
    let token = localStorage.getItem("isLoggedIN");
    //    
  }
}
