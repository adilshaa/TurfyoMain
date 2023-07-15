import { Component, OnInit } from '@angular/core';
import { ResturantControlServiceService } from '../../../core/services/resturant-control-service.service';

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.css'],
})
export class ListStockComponent implements OnInit {
  stocksData!: any[];
  currentDate!: any;
  constructor(private _resService: ResturantControlServiceService) {}
  ngOnInit(): void {
    this.currentDate = new Date().toLocaleDateString();

    this._resService.getAllStocks().subscribe((res: any) => {
      this.stocksData = res;
    });
  }
}
