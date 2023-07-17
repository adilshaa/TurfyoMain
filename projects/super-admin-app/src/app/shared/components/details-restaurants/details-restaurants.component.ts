import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { FullRestaurantDetails } from "../../../core/models/restaurant.model";
import { retriveResFullDetails } from "../../../core/store/super-admin.actions";
import { restaurantsFullDetails } from "../../../core/store/super-admin.selectors";
import { HttpClient } from "@angular/common/http";
import { SuperAdminEmitter } from "../../emitters/emitters";
import { ServiceService } from "../../../core/services/service.service";
import { Form, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-details-restaurants",
  templateUrl: "./details-restaurants.component.html",
  styleUrls: ["./details-restaurants.component.css"],
})
export class DetailsRestaurantsComponent implements OnInit {
  restaurantId: any;
  resFullDetails$ = this.resDataStore.pipe(select(restaurantsFullDetails));
  isEdit!: boolean;
  form!: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private service: ServiceService,
    private formBuilder: FormBuilder,
    private resDataStore: Store<{ allRestaurantData: FullRestaurantDetails }>
  ) {}
  ngOnInit(): void {
    console.log(this.resFullDetails$);

    this.restaurantId = this.route.snapshot.paramMap.get("id");
    // console.log(this.restaurantId);
    this.resDataStore.dispatch(
      retriveResFullDetails({ id: this.restaurantId })
    );
    this.http
      .get("http://localhost:5000/superadmin/superAdminStatus", {
        withCredentials: true,
      })
      .subscribe(
        (result: any) => {
          this.isEdit = false;
          //  this.data = result.email;

          SuperAdminEmitter.Emitter.emit(true);
        },
        (err) => {
          this.router.navigate(["/login"]);
          console.log("error");
          localStorage.removeItem("isLoggedIN");
          SuperAdminEmitter.Emitter.emit(false);
        }
      );

    this.form = this.formBuilder.group({
      name: "",
      place: "",
      owner_name: "",
      owner_number: "",
    });
  }
  listrestaurant(id: any, status: boolean) {
    this.service.listrestaurant(id, status);
  }

  editRestaurant() {
    this.isEdit = true;
  }
  saveEdit(id: any) {
    let updateData = this.form.getRawValue();
    this.http
      .post(`http://localhost:5000/restaurants/save_edit/${id}`, updateData, {
        withCredentials: true,
      })
      .subscribe(() => {
        this.router.navigate([this.router.url]);
        this.isEdit = false;
        this.resDataStore.dispatch(
          retriveResFullDetails({ id: this.restaurantId })
        );
      });
  }
}
