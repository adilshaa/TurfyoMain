import { Component, OnInit } from '@angular/core';
import { DiningServicesService } from 'projects/dining-app/src/app/core/services/dining-services.service';
import { fadeInAnimation, fadeOutAnimation } from '../../../animations/angular';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
  animations: [fadeOutAnimation, fadeInAnimation],
})
export class TableViewComponent implements OnInit {
  tables: any;
  Orders!: any[];
  currentOrder!: any;
  allFoods!: any[];
  total_amount!: number;
  total_Foods_Count!: Number;
  CloseDiv: boolean = true;
  openDIv: boolean = true;

  openState: string = 'hidden';
  closeState: string = 'visible';

  constructor(private dinigService: DiningServicesService) {}
  ngOnInit(): void {
    this.getAllTables();
    this.getAllOrders();
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
  getAllTables() {
    this.dinigService.leadTables().subscribe((res: any) => {
      this.tables = res.tables;
    });
  }
  getAllOrders() {
    this.dinigService.getAllOrders().subscribe((res: any) => {
      this.Orders = res.orders;
      console.log(this.Orders[0].tableId._id);
    });
  }
  takeCurrentOrder(id: any) {
    let orderDetails: any = this.Orders.find(
      (item: any) => item.tableId._id == id
    );
    
    if (orderDetails) {
      this.openDiv();
      this.allFoods = orderDetails.foods;
      console.log(this.allFoods);
      this.total_Foods_Count = orderDetails.foods.length;
      this.total_amount = orderDetails.total_price;
    } else {
      this.closeDiv();
    }

    // this.currentOrder = orderDetails.foods.map((item:any)=> console.log(item)
    // )
  }
}
