import { Component, OnInit } from '@angular/core';
import { RestaurantControlEmitter } from '../../../emmiter/res-control-emmitter';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  authonticated!: boolean;
  constructor() {}
  ngOnInit(): void {
    console.log(this.authonticated);

    RestaurantControlEmitter.resEmitter.subscribe((res: boolean) => {
      this.authonticated = res;
      console.log(res);

      // this.authonticated=false
    });
  }
}

trigger('fadeSlideInOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(10px)' }),
    animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
  transition(':leave', [
    animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' })),
  ]),
]);
