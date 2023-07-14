import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiningServicesService {
  mainUrl: string = 'http://localhost:5000/';
  backRouterUrl: string = 'dining/';
  constructor(private http: HttpClient) {}
  fetchFoods() {
    
    console.log("ON Dinig Service");
    
    return this.http.get(`${this.mainUrl}${this.backRouterUrl}fetchFoods`, {
      withCredentials: true,
    });
  }
}
