import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PosServiceService {
  mainUrl: string = 'http://localhost:5000/';
  backRouter: string = 'pos/';
  constructor(private http: HttpClient) {}

  staffLogin(data: any) {
    console.log(data);

    return this.http.post(`${this.mainUrl}${this.backRouter}staffLogin`, data, {
      withCredentials: true,
    });
  }
  verifyStaff() {
    return this.http.get(`${this.mainUrl}${this.backRouter}VerifyPosStaff`, {
      withCredentials: true,
    });
  }
  generteQR(id: string) {
  return this.http.post(`${this.mainUrl}${this.backRouter}generateQr`,{},{withCredentials:true});
  };
}
