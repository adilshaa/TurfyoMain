import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResturantControlServiceService } from '../../../core/services/resturant-control-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.css'],
})
export class ListStockComponent implements OnInit {
  stocksData!: any[]; 
  currentDate!: any;
  @ViewChild('carSearch') searchInput!: ElementRef;
  constructor(
    private _resService: ResturantControlServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.currentDate = new Date().toLocaleDateString();

    this._resService.getAllStocks().subscribe((res: any) => {
      console.log(res);

      this.stocksData = res;
    });

  }

  editStock(id: any) {
    this.router.navigate(['/editStock', id]);
  }
}
