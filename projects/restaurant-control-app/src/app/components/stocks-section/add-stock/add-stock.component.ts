import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResturantControlServiceService } from '../../../core/services/resturant-control-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css'],
})
export class AddStockComponent implements OnInit {
  stockData!: FormGroup;
  submitted!: boolean;
  constructor(
    private _FormBuilder: FormBuilder,
    private _router: Router,
    private _tostr: ToastrService,
    private _resService: ResturantControlServiceService
  ) {}
  ngOnInit(): void {
    this.stockData = this._FormBuilder.group({
      stockName: new FormControl('', [Validators.required]),
      stockQuantity: new FormControl('', [Validators.required]),
      stockExpairy: new FormControl([Validators.required]),
    });
  }
  AddStocks() {
    try {
      this.submitted = true;
      if (this.stockData.invalid) {
        return;
      }
      let stocksData = this.stockData.getRawValue();
      if (!stocksData) this._tostr.error('somthing went worng');
      this._resService.addStock(stocksData).subscribe((res) => {
        this._router.navigate(['/Stocks']);
      });
    } catch (error) {}
  }
}
