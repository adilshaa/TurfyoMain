import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { foodsStructure } from 'projects/dining-app/src/app/core/models/foods';
import { DiningServicesService } from 'projects/dining-app/src/app/core/services/dining-services.service';
import { getAllFoods } from 'projects/dining-app/src/app/core/store/dining.actions';
import { foodsDatas } from 'projects/dining-app/src/app/core/store/dining.selectosr';
import { Observable, fromEvent } from 'rxjs';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-food-view',
  templateUrl: './food-view.component.html',
  styleUrls: ['./food-view.component.css'],
})
export class FoodViewComponent implements OnInit {
  searchFoods: string = '';
  socket = io('http://localhost:5000');
  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('myModal_1') myModal_1!: ElementRef;

  foodData!: any[];
  cartItems: any[] = [];
  tables!: any[];
  empty!: boolean;
  quantityValues: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  showCookieNotice = false;
  cartIsEmpty!: boolean;
  emptyTables!: boolean;
  Eachfood!: any;
  food_name!: string;
  food_image!: string;
  food_price!: string;
  food_id!: any;
  t_id!: string;
  orderForm!: FormGroup;
  constructor(
    private router: Router,
    private diningService: DiningServicesService,
    private tostr: ToastrService,
    private diningStore: Store<{ foodsData: foodsStructure[] }>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    let resId = localStorage.getItem('resId');

    this.socket.emit('listFoods', resId);
    const showFoods$ = fromEvent(this.socket, 'showFoods');
    const subscription = showFoods$.subscribe(
      (data) => {
        this.tostr.info('Foods is updated 🍔');
        this.foodData = data;
        if (this.foodData[0] == null) {
          this.empty = true;
        } else {
          this.empty = false;
        }
        setTimeout(() => {
          this.tostr.clear();
        }, 2000);
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );

    this.diningService.leadTables().subscribe((res: any) => {
      console.log(res.tables);

      let freeTables = res.tables.filter(
        (table: { table_status: boolean }) => table.table_status == false
      );

      if (freeTables[0]) {
        this.tables = freeTables;
        this.emptyTables = true;
      } else {
        this.emptyTables = false;
      }
    });

    this.orderForm = this.formBuilder.group({
      quantity: '',
      table:'',
      note: '',
    });
  }

  cheakCartIsEmpty() {
    if (this.cartItems[0] == null) {
      this.cartIsEmpty = false;
    } else {
      this.cartIsEmpty = true;
    }
  }
  loadEacheFood(id: any) {
    let foodData = this.foodData.find((item: any) => item._id == id);
    this.food_image = foodData.image;
    this.food_name = foodData.name;
    this.food_price = foodData.price;
    this.food_id = foodData._id;
  }
  addTocart(id: any) {
    let order = this.orderForm.getRawValue();
    console.log(order);

    let duplicateFood;
    this.foodData.map((item) => {
      duplicateFood = this.cartItems.find((item) => item.foodId == id);
      if (!duplicateFood)
        if (item._id == id) {
          const orderData = {
            foodImage: item.image,
            foodName: item.name,
            foodId: item._id,
            foodPrice: item.price,
            foodQuantity: order.quantity,
            foodNote: order.note,
            tableId:order.table
          };
          this.cartItems.push(orderData);
          this.cheakCartIsEmpty();
          // console.log(this.cartItems);
        }
      this.closeModal();
    });
  }
  removeFromCart(id: any) {
    let index = this.cartItems.findIndex((items: any) => items.foodId == id);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
    this.cheakCartIsEmpty();
  }
  closeModal() {
    // Use nativeElement to access the DOM element and trigger the modal close
    this.myModal.nativeElement.click();
    this.myModal_1.nativeElement.click();
  }

  proceesOrder() {
    if (this.cartItems[0] == null) {
      this.tostr.warning('Please order any food');
    }
    this.diningService.proceedOrder(this.cartItems).subscribe(
      (res) => {
        this.closeModal();

        this.cartItems.splice(0, this.cartItems.length);
        this.cheakCartIsEmpty();
      },
      (err) => console.log(err)
    );
  }
}
