import { Component, OnInit } from '@angular/core';
import { RestaurantControlEmitter } from '../../emmiter/res-control-emmitter';
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
  ) {}

  ngOnInit(): void {
    const socket = io('http://localhost:5000');

    socket.on('hello', (data) => {
      console.log(data);
    });
    let result;
    this.route.queryParams.subscribe((params) => {
      result = params['result'];
      // Process the received parameters
      console.log('Received param2:', result);
    });
    this.http
      .post(
        'http://localhost:5000/resadmin/verifyresadmin',
        { result },
        {
          withCredentials: true,
        }
      )
      .subscribe(
        (result: any) => {
          if (result) {
            this.router.navigate(['.']);
            RestaurantControlEmitter.resEmitter.emit(true);
          } else {
            RestaurantControlEmitter.resEmitter.emit(false);
            // this.router.navigate(['/login']);
          }
        },
        (err) => {
          // this.router.navigate(['/login']);
          RestaurantControlEmitter.resEmitter.emit(false);
        }
      );
  }
}
