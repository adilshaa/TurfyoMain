import { Component, OnInit } from '@angular/core';
import { PosServiceService } from '../../core/services/pos-service.service';
import { io } from 'socket.io-client';
import { fromEvent } from 'rxjs';
import { SocketKitchenServiceService } from 'projects/kitchen-app/src/app/core/services/socket-kitchen-service.service';
import { PosSocketServiceService } from '../../core/services/pos-socket-service.service';
import { Router } from '@angular/router';
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
  constructor(
    private _posService: PosServiceService,
    private _posSocketService: PosSocketServiceService,
    private _router:Router
  ) {}
  ngOnInit(): void {
    this.loadOrders();
  }
  loadOrders() {
    this._posSocketService.emit('loadOrdersToPOS', {});
    this._posSocketService.listen('listOrdersToPOS').subscribe(
      (res) => {
        this.orders = res;
      },
      (err) => console.log(err)
    );
  }
  generateQr(id: string) {
    this._posService.generteQR(id).subscribe((res) => {
      console.log(res);
    });
  }
  ProceedOrder(id: string) {
    this._posService.proceesOrder(id).subscribe((res) => {
      console.log(res);
      this._posSocketService.emit('loadOrdersToPOS', {});
      this._posSocketService.emit('loadToOrdersHistory', {});
    });
  }
  moreView(id: string) {
    if (id) {
      this._router.navigate(['',id])
    }
  }
}
