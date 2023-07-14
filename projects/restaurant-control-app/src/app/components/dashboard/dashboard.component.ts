import { Component, OnInit } from '@angular/core';
import { RestaurantControlEmitter } from '../../shared/emmiter/res-control-emmitter';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { io } from 'socket.io-client';
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
    // let jwt = localStorage.getItem('ResadminisLoggedIN');
    // console.log(jwt + '123');
  }

  ngOnInit(): void {
    // const socket = io('http://localhost:5000');

    // socket.on('hello', (data) => {
    //   console.log(data);
    // });
    // let result;
    //  this.route.queryParams.subscribe((params) => {
    //    result = params['result'];
    //    // Process the received parameters
    //    console.log('Received param2:', result);
    //  });
    this.http
      .get('http://localhost:5000/resadmin/verifyresadmin', {
        withCredentials: true,
      })
      .subscribe(
        (result: any) => {
          console.log(result);
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
      this.router.navigate([this.route.url]);
    } else {
      this.router.navigate(['/controllersLogin']);
    }
  }
}
