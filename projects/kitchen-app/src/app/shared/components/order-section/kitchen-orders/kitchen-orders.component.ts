import { Component, OnInit } from '@angular/core';
import { KitchenServiceService } from 'projects/kitchen-app/src/app/core/services/kitchen-service.service';
import { fromEvent } from 'rxjs';
import { io } from 'socket.io-client';
import { fadeInAnimation, fadeOutAnimation } from '../../../animations/angular';

@Component({
  selector: 'app-kitchen-orders',
  templateUrl: './kitchen-orders.component.html',
  styleUrls: ['./kitchen-orders.component.css'],
  animations: [fadeOutAnimation, fadeInAnimation],
})
export class KitchenOrdersComponent implements OnInit {
  socket = io('http://localhost:5000');
  resId = localStorage.getItem('resId');
  Orders!: any[];
  allFoods: any;
  total_Foods_Count!: Number;
  total_amount!: Number;
  CloseDiv: boolean = true;
  openDIv: boolean = true;

  openState: string = 'hidden';
  closeState: string = 'visible';
  constructor(private _kitchenService: KitchenServiceService) {}
  ngOnInit(): void {
    this.loadOrders();
  }
  closeDiv() {
    this.closeState = 'hidden';
    this.openState = 'hidden';
    setTimeout(() => {
      this.CloseDiv = true;
      this.openDIv = false;
    }, 300);
  }

  openDiv() {
    this.closeState = 'visible';
    this.openState = 'visible';
    setTimeout(() => {
      this.openDIv = true;
      this.CloseDiv = false;
    }, 300);
  }
  loadOrders() {
    this.socket.emit('loadOrders', this.resId);
    const ListOrders$ = fromEvent(this.socket, 'listOrder');
    ListOrders$.subscribe(
      (data) => {
        console.log(data);
        this.Orders = data;
        console.log(this.Orders);
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }
  takeCurrentOrder(id: any) {
    let orderDetails: any = this.Orders.filter((item: any) => item._id == id);
    console.log(orderDetails);

    this.allFoods = orderDetails[0].foods;
    console.log(this.allFoods);
    this.total_Foods_Count = orderDetails[0].foods.length;
    this.total_amount = orderDetails[0].total_price;

    // this.currentOrder = orderDetails.foods.map((item:any)=> console.log(item)
    // )
  }
}
