import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { SuperAdminEmitter } from "../../shared/emitters/emitters";
import { Router } from "@angular/router";
import { DetailsRestaurantsComponent } from "../../shared/components/details-restaurants/details-restaurants.component";
import { FullRestaurantDetails } from "../models/restaurant.model";
import { Store } from "@ngrx/store";
import { retriveResFullDetails } from "../store/super-admin.actions";

@Injectable({
  providedIn: "root",
})
export class ServiceService implements OnInit {
  PortUrl: string = "https://oxres.site/";
  superAdminPathUrl: string = "superadmin/";
  restarurantPathUrl: string = "restaurants/";
  constructor(
    private http: HttpClient,
    private router: Router,
    private resDataStore: Store<{ allRestaurantData: FullRestaurantDetails }>
  ) {}

  ngOnInit(): void {}

  // Login of super admin
  LoginSuperDamin(user: any) {
    console.log("ahiii");
    console.log(user);
    this.http
      .post(`${this.PortUrl + this.superAdminPathUrl}superadminlogin`, user, {
        withCredentials: true,
      })
      .subscribe((response: any) => {
        const token = response.token;
        localStorage.setItem("superadmin", token);
        localStorage.setItem("isLoggedIN", "true");
        SuperAdminEmitter.Emitter.emit(true);
        this.router.navigate(["/"]),
          (err: any) => {
            console.log("error");
            this.router.navigate(["/login"]);
            console.log(err);
          };
      });
  }
  //Load restaurants Datas to store
  ParnerRegistration(data: any) {
    console.log(data);
    this.http
      .post(`${this.PortUrl + this.restarurantPathUrl}resgister`, data, {
        withCredentials: true,
      })
      .subscribe(
        () => {
          window.location.href = `http://localhost:3200`;
          window.close();
        },
        (err: any) => console.log(err)
      );
  }
  InitailLogin(data: any) {
    return this.http.post(
      "${this.PortUrl + this.restarurantPathUrl}initialLogin",
      data,
      { withCredentials: true }
    );
  }
  initialLoginWithGoogle(data: any) {
    return this.http.post(
      `${this.PortUrl + this.restarurantPathUrl}initialLogin`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  getAllRestaurantsData() {
    return this.http.get(
      `${this.PortUrl + this.restarurantPathUrl}get_allRestaurant`,
      {
        withCredentials: true,
      }
    );
  }
  // Get details of Restaurant
  fullDetails(id: any) {
    console.log(id);

    return this.http.get(
      `${this.PortUrl + this.restarurantPathUrl}full_details/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  //Delete restaurants by super admin

  listrestaurant(id: any, status: boolean) {
    console.log("list");
    if (status == true) {
      status = false;
    } else {
      status = true;
    }
    this.http
      .post(
        `${this.PortUrl + this.restarurantPathUrl}list_restaurants/${id}`,
        { status: status },
        {
          withCredentials: true,
        }
      )
      .subscribe(
        (result: any) => {
          console.log("listed");
          this.router.navigate([this.router.url]);
          this.resDataStore.dispatch(retriveResFullDetails({ id: id }));
        },
        (err) => console.log(err)
      );
  }

  // edit restaurant by super admin
}
