import { Component, OnInit } from '@angular/core';
import { RestaurantControlEmitter } from '../../../shared/emmiter/res-control-emmitter';
import { animate, style, transition, trigger } from '@angular/animations';
import { ResturantControlServiceService } from '../../../core/services/resturant-control-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  authonticated!: boolean;
  constructor(
    private resService: ResturantControlServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    RestaurantControlEmitter.resEmitter.subscribe((res: boolean) => {
      this.authonticated = res;
    });
  }
  logoutResAdmin() {
    localStorage.removeItem('ResadminisLoggedIN');
    localStorage.removeItem('resId');
    this.resService.LogOutResAdmin().subscribe((res) => {
      RestaurantControlEmitter.resEmitter.emit(false);

      localStorage.removeItem('resadmin');
      location.href = 'http://localhost:3200/ControllerLogin';
      // this.router.navigate(['/ControllerLogin']);
    });
  }
}
