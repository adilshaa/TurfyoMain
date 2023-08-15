import { Component, OnInit } from '@angular/core';
import { PosServiceService } from '../../core/services/pos-service.service';
import { io } from 'socket.io-client';
import { fromEvent } from 'rxjs';
import { PosSocketServiceService } from '../../core/services/pos-socket-service.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  socket: any = io('http://localhost:5000');
  resId: string | null = localStorage.getItem('resId');
  ListOrders$!: any[];
  constructor(private _PosServie: PosServiceService,private _posSocketService:PosSocketServiceService) {}
  ngOnInit(): void {
    this.loadOrderHistory();
  }
  loadOrderHistory() {
    this._posSocketService.emit('loadToOrdersHistory', {});
    this._posSocketService.listen('listOrderHistories').subscribe(
      (res) => {
        this.ListOrders$ = res;
      },
      (err) => console.log(err)
    );
    fromEvent(this.socket, 'listorderHistories').subscribe(
      (res:any) => {
        console.log(res);
      },
      
    );
  }
}
