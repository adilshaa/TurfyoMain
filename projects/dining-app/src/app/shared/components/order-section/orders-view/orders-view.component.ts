import { Component, OnInit } from '@angular/core';
import { DiningServicesService } from 'projects/dining-app/src/app/core/services/dining-services.service';
import { fromEvent } from 'rxjs';
import { io } from 'socket.io-client';
import { fadeInAnimation, fadeOutAnimation } from '../../../animations/angular';
import { DiningSocketServiceService } from 'projects/dining-app/src/app/core/services/dining-socket-service.service';
import { DiningNotifyComponent } from '../../notifications/dining-notify/dining-notify.component';
import { Order } from 'projects/dining-app/src/app/core/models/order';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.css'],
  animations: [fadeOutAnimation, fadeInAnimation],
})
export class OrdersViewComponent implements OnInit {
  socket = io('http://localhost:5000');
  resId = localStorage.getItem('resId');
  Orders!: Order[];
  allFoods: any;
  total_Foods_Count!: number | undefined;
  total_amount!: number | undefined;
  CloseDiv: boolean = true;
  openDIv: boolean = true;
  current_order!: Order;
  openState: string = 'hidden';
  closeState: string = 'visible';
  constructor(
    private _diningService: DiningServicesService,
    private _diningSocketService: DiningSocketServiceService,
    private _notifications: DiningNotifyComponent
  ) {}
  ngOnInit(): void {
    this.loadOrder();
    this.NewOrders();
    this.servedOrder();
     this._diningSocketService.listen('updateServedOrder').subscribe((res) => {
       console.log('heloooo');
       console.log(res, 'rached');

       this._notifications.handleNewOrderNotification(
         `Order to ${res.tableId.table_Name} - ${res.tableId.table_No} id Ready `
       );
       this.Orders = this.Orders.map((items) => {
         if (items._id == res._id) {
           return res;
         }
         return items;
       });
     });
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

  loadOrder() {
    this._diningSocketService.emit('loadOrdersToPOS', {});
    this._diningSocketService.listen('listOrdersToPOS').subscribe(
      (data) => {
        this.Orders = data;
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }
  NewOrders() {
    this._diningSocketService.listen('pushNewOrder').subscribe((newOrder) => {
      this._notifications.handleNewOrderNotification('New Orders');
      this.Orders.push(newOrder);
    });
  }
  servedOrder() {
   
  }
  takeCurrentOrder(id: string) {
    let currentOrder = this.Orders.find((item: any) => item._id == id);
    if (currentOrder) {
      this.current_order = currentOrder;
      this.allFoods = this.current_order.foods;
      this.total_Foods_Count = this.current_order.foods.length;
      this.total_amount = this.current_order.total_price;
    }

    // this.currentOrder = orderDetails.foods.map((item:any)=> console.log(item)
    // )
  }
  ServingFood(id: string) {
    this._diningService.updateServingStatus(id).subscribe(
      (res) => {
      
            this._diningSocketService.emit('loadOrdersToPOS', {});
            
        this.closeDiv();
      },
      (err) => console.log(err)
    );
  }
}
