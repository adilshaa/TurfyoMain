import { Component, OnInit } from '@angular/core';
import { RestaurantControlEmitter } from '../../shared/emmiter/res-control-emmitter';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
   
  }

  ngOnInit(): void {
    this.http
      .get('http://localhost:5000/resadmin/verifyresadmin', {
        withCredentials: true,
      })
      .subscribe(
        (result: any) => {
            RestaurantControlEmitter.resEmitter.emit(true);
        },
        ((err) => {
          console.log(err); 
          localStorage.removeItem('ResadminisLoggedIN');
          this.router.navigate(['/controllersLogin']);
          RestaurantControlEmitter.resEmitter.emit(false);
        })
      );
    const isSuperAdmin = localStorage.getItem('ResadminisLoggedIN');
    if (isSuperAdmin) {
    } else {
      this.router.navigate(['/controllersLogin']);
    }
  }
}

