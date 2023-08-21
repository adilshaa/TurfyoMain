import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PosServiceService } from '../../core/services/pos-service.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  OrderId!: any;
  Order: any;
  OrderFoods:any[]=[]
  constructor(
    private route: ActivatedRoute,
    private _posService: PosServiceService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.OrderId = params['id'];
      console.log(this.OrderId);
      this.loadOrder(this.OrderId);
    });
  }
  loadOrder(id: string) {
    this._posService.takeCurrentOrder(id).subscribe((res) => {
      this.Order = res;
      console.log(this.Order);
      this.OrderFoods=this.Order.foods
    });
  }
  ngOnDestroy(): void {}
}
