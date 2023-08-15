import { Component, OnInit } from '@angular/core';
import { KitchenServiceService } from 'projects/kitchen-app/src/app/core/services/kitchen-service.service';
import { fromEvent } from 'rxjs';
import { io } from 'socket.io-client';
import { fadeInAnimation, fadeOutAnimation } from '../../../animations/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { KitchenNotifyComponent } from '../../../notificatinos/kitchen-notify/kitchen-notify.component';
import { SocketKitchenServiceService } from 'projects/kitchen-app/src/app/core/services/socket-kitchen-service.service';

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
  orderDetails!: any;
  openState: string = 'hidden';
  closeState: string = 'visible';
  constructor(
    private _kitchenService: KitchenServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private notifications: KitchenNotifyComponent,
    private _KitchenSocketService: SocketKitchenServiceService
  ) {}
  ngOnInit(): void {
    this.loadOrders();
    this.NewOrders();
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
    this._KitchenSocketService.emit('loadOrderskitchenside', {});
    this._KitchenSocketService.listen('listOrdersKitchen').subscribe(
      (res) => {
        this.Orders = res;
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }
  NewOrders() {
    this._KitchenSocketService.listen('pushNewOrder').subscribe((newOrder) => {
      console.log(newOrder);
      this.notifications.handleNewOrderNotification('New Orders');
      this.Orders.push(newOrder);
    });
  }

  takeCurrentOrder(id: any) {
    this.orderDetails = this.Orders.find((item: any) => item._id == id);
    console.log(this.orderDetails);
    this.allFoods = this.orderDetails.foods;
    this.total_Foods_Count = this.orderDetails.foods.length;
    this.total_amount = this.orderDetails.total_price;

    // this.currentOrder = orderDetails.foods.map((item:any)=> console.log(item)
    // )
  }

  foodIsReady(id: any) {
    console.log(id);
    this._kitchenService.Foodiready(id).subscribe(
      (res) => {
        this._KitchenSocketService.emit('foodIsReady', { id: id });
        console.log(res);
        this.loadOrders();
        this.closeDiv();
      },
      (err) => console.log(err)
    );
  }
}
