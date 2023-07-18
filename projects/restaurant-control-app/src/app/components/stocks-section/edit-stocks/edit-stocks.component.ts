import { Component, OnInit } from '@angular/core';
import { ResturantControlServiceService } from '../../../core/services/resturant-control-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-stocks',
  templateUrl: './edit-stocks.component.html',
  styleUrls: ['./edit-stocks.component.css'],
})
export class EditStocksComponent implements OnInit {
  stockData!: FormGroup;
  stock: any;
  stockId!: any;
  submitted: boolean = false;
  constructor(
    private resService: ResturantControlServiceService,
    private router: Router,
    private _FormBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.stockId = this.route.snapshot.paramMap.get('id');
    this.resService.loadEditStock(this.stockId).subscribe((res: any) => {
      console.log(res.stock);
      this.stock = res.stock;
    });
    this.stockData = this._FormBuilder.group({
      stockName: new FormControl('', [Validators.required]),
      stockQuantity: new FormControl('', [Validators.required]),
      stockExpairy: new FormControl([Validators.required]),
    });
  }
  AddStocks() {
    this.submitted = true;
    if (this.stockData.invalid) {
      return;
    }

    let UpdateData = this.stockData.getRawValue();
    console.log(UpdateData);

    this.resService.upadteStock(UpdateData, this.stockId).subscribe((res) => {
      this.router.navigate(['/Stocks']);
    });
  }
}
