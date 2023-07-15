import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.navigate(['/foods']);

    // const socket = io('http://localhost:5000');

    // socket.on('hello', (data) => {
    //   console.log(data);
    // });
  }
}
