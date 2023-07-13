import { Component, OnInit } from '@angular/core';
import { RestaurantControlEmitter } from '../../../shared/emmiter/res-control-emmitter';
import { animate, style, transition, trigger } from '@angular/animations';
import { ResturantControlServiceService } from '../../../core/services/resturant-control-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  authonticated!: boolean;
  constructor(private resService:ResturantControlServiceService) {}
  ngOnInit(): void {
    console.log(this.authonticated);

    RestaurantControlEmitter.resEmitter.subscribe((res: boolean) => {
      this.authonticated = res;
      
    });
  }
  logoutResAdmin() {
    this.resService.LogOutResAdmin()
  }
}

