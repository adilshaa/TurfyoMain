import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SuperAdminEmitter } from '../../emitters/emitters';
import { Router } from '@angular/router';
import { restaurantModel } from '../../../core/models/restaurant.model';
import { Store, select } from '@ngrx/store';
import { getRestaurantData } from '../../../core/store/super-admin.actions';
import { retaurantDatas } from '../../../core/store/super-admin.selectors';
import { ServiceService } from '../../../core/services/service.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})
export class DashbordComponent implements OnInit {
  data!: string;
  restaurantData$ = this.store.pipe(select(retaurantDatas));
  
  isLoader:Boolean=true
  constructor(
    private http: HttpClient,
    private router: Router,
    private servie: ServiceService,
    private store: Store<{ restaurantData: restaurantModel[] }>
  ) {}
  ngOnInit(): void {
      setTimeout(() => {
        this.isLoader = false;
      }, 500);
    this.http
      .get('http://localhost:5000/superadmin/superAdminStatus', {
        withCredentials: true,
      })
      .subscribe(
        (result: any) => {
          console.log('dashboard');
          console.log(result);
          this.data = result.email;
          this.store.dispatch(getRestaurantData());
          SuperAdminEmitter.Emitter.emit(true);
        },
        (err) => {
          console.log('error');
          localStorage.removeItem('isLoggedIN');
        }
      );
    const isSuperAdmin = localStorage.getItem('isLoggedIN');
    if (isSuperAdmin) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  fullDetatils(id: any) {
    this.router.navigate(['full_details', id]);
  }
}
