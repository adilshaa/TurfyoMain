import { Injectable } from '@angular/core';
import { RestaurantControlEmitter } from '../../shared/emmiter/res-control-emmitter';

@Injectable({
  providedIn: 'root',
})
export class ResAuthServiceService {
  constructor() {}
  isResAdminisLoggedIN() {
    console.log("auth gaurad");
    
    RestaurantControlEmitter.resEmitter.emit(true);
    return !!localStorage.getItem('ResadminisLoggedIN');
  }
}



