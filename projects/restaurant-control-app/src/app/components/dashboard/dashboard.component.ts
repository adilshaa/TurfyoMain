import { Component, OnInit } from '@angular/core';
import { RestaurantControlEmitter } from '../../shared/emmiter/res-control-emmitter';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ResturantControlServiceService } from '../../core/services/resturant-control-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isLoader: Boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private _resService: ResturantControlServiceService
  ) {}

  ngOnInit(): void {
    this.vadlidateRestaurant();
  }
  vadlidateRestaurant() {
    this._resService.validateRestaurant().subscribe(
      (result: any) => {
        RestaurantControlEmitter.resEmitter.emit(true);
        // this.router.navigate(['/'])
      },
      (err) => {
        console.log(err);
        localStorage.removeItem('ResadminisLoggedIN');
        localStorage.removeItem('resId');
        localStorage.removeItem('resadmin');

        RestaurantControlEmitter.resEmitter.emit(false);
      }
    );
  }
}
