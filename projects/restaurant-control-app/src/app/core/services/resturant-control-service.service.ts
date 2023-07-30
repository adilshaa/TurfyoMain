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
    return this.http.post(`${this.url}${this.backoRouter}addstaffs`, data, {
      withCredentials: true,
    });
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
  resAdminLoginWothGoogle(resasmin: any) {
    return this.http.post(
      `${this.url}${this.backoRouter}googleLogin`,
      resasmin,
      {
        withCredentials: true,
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

  getAllStocks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}${this.backoRouter}KitchenStocks`, {
      withCredentials: true,
    });
  }
  getCars(query: any) {
    return;
  }

  addStock(data: any) {
    return this.http.post(`${this.url}${this.backoRouter}addStock`, data, {
      withCredentials: true,
    });
  }
  loadTables(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}${this.backoRouter}/getTables`, {
      withCredentials: true,
    });
  }
  createTable() {
    console.log('here');
    return this.http.get(`${this.url}${this.backoRouter}createTable`, {
      withCredentials: true,
    });
  }
  loadEditStock(id: any) {
    return this.http.get(
      `${this.url}${this.backoRouter}loadEditableStock/${id}`,
      {
        withCredentials: true,
      }
    );
  }
  upadteStock(data: any, id: any) {
    return this.http.post(
      `${this.url}${this.backoRouter}updateStock/${id}`,
      data,
      {
        withCredentials: true,
      }
    );
  }
  editFoodImage(id: string, image: File, name: string) {
    console.log();

    return this.http.post(
      `${this.url}${this.backoRouter}editImage/${id}`,
      image,
      {
        withCredentials: true,
      }
    );
  }
  editFoodsCnt(data: any, id: string) {
    console.log(data, id);

    return this.http.post(
      `${this.url}${this.backoRouter}editFoodCnt/${id}`,
      data,
      { withCredentials: true }
    );
  }
  addFoodCategory(data:any) {
    return this.http.post(`${this.url}${this.backoRouter}addfoodCategory`,data,{withCredentials:true})
  }
  filterFood(id: string):Observable<any[]> {
    return this.http.get<any[]>(
      `${this.url}${this.backoRouter}filterFood/${id}`
    );
  };
  LogOutResAdmin() {
    return this.http.get(`${this.url}${this.backoRouter}logout`, {
      withCredentials: true,
    });
  }
}
