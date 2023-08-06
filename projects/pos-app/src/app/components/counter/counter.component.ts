import { Component, OnInit } from '@angular/core';
import { PosServiceService } from '../../core/services/pos-service.service';
import { io } from 'socket.io-client';
import { fromEvent } from 'rxjs';
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent implements OnInit {
  socket = io('http://localhost:5000');
  resId = localStorage.getItem('resId');
  orders!: any;
  totalOrderCash!: Number;
  constructor(private _posService: PosServiceService) {}
  ngOnInit(): void {
    this.loadOrders();
  }
  loadOrders() {
    this.socket.emit('loadOrders', this.resId);
    const ListOrders$ = fromEvent(this.socket, 'loadordersToCounter');

    ListOrders$.subscribe(
      (res: any) => {
        console.log(res);

        this.orders = res;

        // this.orders.foods.map((items:any) => {
        //   items.food_totalprice;
        // })
      },
      (err) => console.log(err)
    );
  }
  generateQr(id:string) {
    this._posService.generteQR(id).subscribe((res) => {
      console.log(res);
      
    })
  }
}
