import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiningServicesService {
  mainUrl: string = 'http://localhost:5000/';
  backRouterUrl: string = 'dining/';
  constructor(private http: HttpClient) {}
  fetchFoods() {
    console.log('ON Dinig Service');

    return this.http.get(`${this.mainUrl}${this.backRouterUrl}fetchFoods`, {
      withCredentials: true,
    });
  }
  leadTables(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.mainUrl}${this.backRouterUrl}loadTable`,
      {
        withCredentials: true,
      }
    );
  }
  diningLogin(data: any) {
    return this.http.post(
      `${this.mainUrl}${this.backRouterUrl}dinigLogin`,
      data,
      { withCredentials: true }
    );
  }
  verifyStaffs() {
    return this.http.get(`${this.mainUrl}${this.backRouterUrl}verifyStaff`, {
      withCredentials: true,
    });
  }
  logoutStaff() {
    return this.http.get(`${this.mainUrl}${this.backRouterUrl}logoutStaff`, {
      withCredentials: true,
    });
  }
  proceedOrder(cartitems: any) {
    return this.http.post(
      `${this.mainUrl}${this.backRouterUrl}orderFoods`,
      cartitems,
      { withCredentials: true }
    );
  }
  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.mainUrl}${this.backRouterUrl}allOrder`,
      {
        withCredentials: true,
      }
    );
  }
  loadOrders(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.mainUrl}${this.backRouterUrl}allOrder`,
      { withCredentials: true }
    );
  }
}
