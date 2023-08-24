import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/dining-app/src/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiningServicesService {
  mainUrl: string = 'https://oxres.site/';
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
  proceedOrder(cartitems: any, table: string) {
    let orderData = {
      orders: cartitems,
      table: table,
    };
    return this.http.post(
      `${this.mainUrl}${this.backRouterUrl}orderFoods`,
      orderData,
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
  filterFood(id: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.mainUrl}${this.backRouterUrl}filterFood/${id}`,
      { withCredentials: true }
    );
  }

  updateServingStatus(id: string) {
    return this.http.get(
      `${this.mainUrl}${this.backRouterUrl}updatingStatus/${id}`
    );
  }
}
