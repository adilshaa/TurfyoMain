import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

    if (status == true) {
      status = false;
    } else {
      status = true;
    }

    return this.http.post(
      `${this.url}${this.backoRouter}listFoods/${id}`,
      { status: status },
      { withCredentials: true }
    );
  }
  staffLogin(data:any) {
    return this.http.post(`${this.url}${this.backoRouter}loginStaff`,data,{withCredentials:true});
  }
  verifyStaff() {
  return this.http.get(`${this.url}${this.backoRouter}verfiyStaff`,{withCredentials:true});
}

}
