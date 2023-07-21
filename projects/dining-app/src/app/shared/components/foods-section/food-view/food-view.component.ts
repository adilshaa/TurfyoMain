import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { foodsStructure } from 'projects/dining-app/src/app/core/models/foods';
import { DiningServicesService } from 'projects/dining-app/src/app/core/services/dining-services.service';
import { getAllFoods } from 'projects/dining-app/src/app/core/store/dining.actions';
import { foodsDatas } from 'projects/dining-app/src/app/core/store/dining.selectosr';
import { Observable, fromEvent } from 'rxjs';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-food-view',
  templateUrl: './food-view.component.html',
  styleUrls: ['./food-view.component.css'],
})
export class FoodViewComponent implements OnInit {
  searchFoods: string = '';
  socket = io('http://localhost:5000');
  foodData!: any[];
  empty!: boolean;
  modal: boolean = false;
  cartItems: any[] = [];
  constructor(
    private router: Router,
    private diningService: DiningServicesService,
    private tostr: ToastrService,
    private diningStore: Store<{ foodsData: foodsStructure[] }>
  ) {}
  ngOnInit(): void {
    let resId = localStorage.getItem('resId');

    this.socket.emit('listFoods', resId);
    const showFoods$ = fromEvent(this.socket, 'showFoods');
    const subscription = showFoods$.subscribe(
      (data) => {
        this.tostr.info('Foods is updated 🍔');
        this.foodData = data;
        if (this.foodData[0] == null) {
          this.empty = true;
        } else {
          this.empty = false;
        }
        setTimeout(() => {
          this.tostr.clear();
        }, 2000);
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }
  addTocart(id: any) {
    this.foodData.map((item) => {
      if (item._id == id) {
        this.cartItems.push(item);
        console.log(this.cartItems);
      }
    });
  }
  removeFromCart(id: any) {
     let index=this.cartItems.findIndex((items:any) =>items._id==id )
    if (index > -1) {
        this.cartItems.splice(index,1)
      } 
    
  }
}
