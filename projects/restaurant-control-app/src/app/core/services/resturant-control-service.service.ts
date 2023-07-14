import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantControlEmitter } from '../../shared/emmiter/res-control-emmitter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResturantControlServiceService {
  url: string = 'http://localhost:5000/';
  backoRouter = 'resadmin/';
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  RegisterStaffs(data: any) {
    if (data) {
      this.http
        .post(`${this.url}${this.backoRouter}addstaffs`, data, {
          withCredentials: true,
        })
        .subscribe(
          (result) => {
            this.router.navigate(['/staffs']);
          },
          (err) => {
            this.router.navigate(['.']);
          }
        );
    }
  }
  fetcheStaffData() {
    console.log('reched service');

    return this.http.get(`${this.url}${this.backoRouter}fetcheStaffs`, {
      withCredentials: true,
    });
  }
  getStaff(id: string): Observable<any> {
    return this.http.get(`${this.url}${this.backoRouter}getStaff/${id}`, {
      withCredentials: true,
    });
  }

  saveEditOfStaffs(id: string, data: object): Observable<any> {
    return this.http.post(
      `${this.url}${this.backoRouter}saveStaffEdits/${id}`,
      data,
      {
        withCredentials: true,
      }
    );
  }
  removeStaffs(id: string) {
    this.http
      .get(`${this.url}${this.backoRouter}removeStaff/${id}`, {
        withCredentials: true,
      })
      .subscribe(
        () => {
          this.router.navigate(['staffs']);
        },
        (err) => {
          throw err;
        }
      );
  }
  LoginController(data: any) {
    return this.http.post(
      `${this.url}${this.backoRouter}ControllerLogin`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  getAllStocks() {
    return this.http.get(`${this.url}${this.backoRouter}/KitchenStocks`, {
      withCredentials: true,
    });
  }

  addStock(data:any) {
    return this.http.post(`${this.url}${this.backoRouter}addStock`,data,{withCredentials:true})
  }
  LogOutResAdmin() {
    return this.http.get(`${this.url}${this.backoRouter}/logout`, {
      withCredentials: true,
    });
  }
}