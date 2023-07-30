import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KitchenServiceService {
  url: string = 'http://localhost:5000/';
  backoRouter: string = 'kitchen/';
  constructor(private http: HttpClient) {}

  fetchFoodsData() {
    return this.http.get(`${this.url}${this.backoRouter}fetchFoods`, {
      withCredentials: true,
    });
  }
  listFoods(id: string, status: boolean) {
    console.log(status, id);

    // return this.http.post(
    //   `${this.url}${this.backoRouter}listFoods/${id}`,
    //   { status: status },
    //   { withCredentials: true }
    // );
  }
  staffLogin(data: any) {
    return this.http.post(`${this.url}${this.backoRouter}loginStaff`, data, {
      withCredentials: true,
    });
  }
  verifyStaff() {
    return this.http.get(`${this.url}${this.backoRouter}verfiyStaff`, {
      withCredentials: true,
    });
  }
  logoutStaff() {
    return this.http.get(`${this.url}${this.backoRouter}logoutStaff`, {
      withCredentials: true,
    });
  }
  fetchOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}${this.backoRouter}fetchOrders`, {
      withCredentials: true,
    });
  }
  updateStock(id: any, key: number) {
    console.log(id, key);

    return this.http.post(
      `${this.url}${this.backoRouter}updateStock/${id}`,
      { key: key },
      { withCredentials: true }
    );
  }
  Foodiready(id: string) {
   return this.http.get(`${this.url}${this.backoRouter}readyFood/${id}`);
  };
}
