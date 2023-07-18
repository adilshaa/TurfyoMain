import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { KitchenServiceService } from '../../../core/services/kitchen-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private kitchenService: KitchenServiceService
  ) {}
  ngOnInit(): void {
    // const socket = io('http://localhost:5000');
    // socket.on('hello', (data) => {
    //   console.log(data);
    // });
    this.kitchenService.verifyStaff().subscribe(
      (res: any) => {},
      (err) => {
        console.log(err.error.message);
        
        localStorage.removeItem('kitchen-staffs');
        this.router.navigate(['/kitchenLogin']);
      }
    );
     let key = localStorage.getItem('kitchen-staffs');
     if (key) {
     } else {
       this.router.navigate(['/diningLogin']);
     }
  }
}
