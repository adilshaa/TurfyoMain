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
    return this.http.get(`${this.mainUrl}${this.backRouterUrl}/verifyStaff`,{withCredentials:true})
  }
}
