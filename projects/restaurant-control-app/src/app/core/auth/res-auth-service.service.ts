import { Injectable } from '@angular/core';
import { SuperAdminEmitter } from 'projects/super-admin-app/src/app/shared/emitters/emitters';
import { RestaurantControlEmitter } from '../../shared/emmiter/res-control-emmitter';

@Injectable({
  providedIn: 'root',
})
export class ResAuthServiceService {
  constructor() {}
  isResAdminisLoggedIN() {
    RestaurantControlEmitter.resEmitter.emit(true);
    return !!localStorage.getItem('ResadminisLoggedIN');
  }
}
