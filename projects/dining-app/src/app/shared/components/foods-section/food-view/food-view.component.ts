import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { foodsStructure } from 'projects/dining-app/src/app/core/models/foods';
import { DiningServicesService } from 'projects/dining-app/src/app/core/services/dining-services.service';
import { Observable, fromEvent } from 'rxjs';
import { io } from 'socket.io-client';
import { foodArrivalFadein } from '../../../animations/angular';
import { DiningNotifyComponent } from '../../notifications/dining-notify/dining-notify.component';
import { DiningSocketServiceService } from 'projects/dining-app/src/app/core/services/dining-socket-service.service';

@Component({
  selector: 'app-food-view',
  templateUrl: './food-view.component.html',
  styleUrls: ['./food-view.component.css'],
  animations: [foodArrivalFadein],
})
export class FoodViewComponent implements OnInit {
  searchFoods: string = '';
  resId = localStorage.getItem('resId');
  orderForm!: FormGroup;

  socket = io('http://localhost:5000');
  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('myModal_1') myModal_1!: ElementRef;

  foodData: any[] = [];
  cartItems: any[] = [];
  tables!: any[];
  empty!: boolean;
  showCookieNotice = false;
  cartIsEmpty!: boolean;
  emptyTables!: boolean;
  food_name!: string;
  food_image!: string;
  food_price!: string;
  food_stock!: number;
  food_id!: any;
  table_id!: string;
  foodFade = false;
  category!: any[];
  quantity: number = 0;
  constructor(
    private router: Router,
    private diningService: DiningServicesService,
    private _diningSocketService: DiningSocketServiceService,
    private tostr: ToastrService,
    private diningStore: Store<{ foodsData: foodsStructure[] }>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notifications: DiningNotifyComponent
  ) {}
  ngOnInit(): void {
    this.loadFood();
    this.updateFoods();
    this.loadTablesToLobby();
    this.orderForm = this.formBuilder.group({
      table: '',
      note: '',
    });
  }

  updateFoods() {
    this._diningSocketService.listen('newDataAdded').subscribe((res) => {
      // this.notifications.handleNewOrderNotification(` ${res.name} is upgraded`);
      const existingIndex = this.foodData.findIndex(
        (items) => items._id == res._id
      );
      if (existingIndex !== -1) {
        if (res.stock > 0) {
          this.foodData[existingIndex] = res;
        } else {
          this.foodData.splice(existingIndex, 1);
          this.loadFood();
        }
      } else {
        if (res.stock > 0) {
          this.foodData.push(res);
          this.loadFood();
        } else {
        }
      }
    });
  }
  loadFood() {
    this._diningSocketService.emit('listFoods', {});
    this._diningSocketService.listen('showFoods').subscribe(
      (data) => {
        const Foodadded = this.socket.on('foodAddes', () => {});
        if (Foodadded) {
        }
        this.foodData = data.foodData;
        if (this.foodData[0] == null) {
          this.empty = true;
        } else {
          this.empty = false;
        }
        this.category = data.categories;
        this.notifications.clearNotifications();
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }
  filterFood(id: string) {
    this.diningService.filterFood(id).subscribe(
      (res: any) => {
        this.foodData = res.food;
        if (this.foodData[0] == null) {
          this.empty = true;
        } else {
          this.empty = false;
        }
      },
      (err) => console.log(err)
    );
  }

  loadTablesToLobby() {
    this.diningService.leadTables().subscribe((res: any) => {
      let freeTables = res.tables.filter(
        (table: { table_status: boolean }) => table.table_status == false
      );
      console.log(freeTables);

      if (freeTables[0]) {
        this.tables = freeTables;
        this.emptyTables = true;
      } else {
        this.emptyTables = false;
      }
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
    this.food_stock = foodData.stock;
  }
  incQnty(key: string) {
    if (key == '+') {
      if (this.food_stock <= this.quantity) {
        this.notifications.normalNotification(
          `Only ${this.food_stock} Quantity is remining `
        );
      } else {
        this.quantity += 1;
      }
    } else {
      if (this.quantity == 0) {
        this.notifications.normalNotification(
          'Quantity should be more than 1 '
        );
      } else {
        this.quantity -= 1;
      }
    }
  }
  addTocart(id: any) {
    let order = this.orderForm.getRawValue();
    if (this.quantity == 0) {
      this.notifications.normalNotification('please add quantity');
    } else {
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
              foodQuantity: this.quantity,
              foodNote: order.note,
            };
            this.cartItems.push(orderData);
            this.quantity = 0;
            this.cheakCartIsEmpty();
          }
        this.closeModal();
        this.foodFade = false;
        setTimeout(() => {
          this.foodFade = true;
        }, 500);
      });
    }
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
    if (this.table_id == undefined) {
      this.notifications.normalNotification('please Select a table');
    }
    this.diningService.proceedOrder(this.cartItems, this.table_id).subscribe(
      (res) => {
        this._diningSocketService.emit('listFoods', {});
        this._diningSocketService.emit('NewOrders', {});
        this._diningSocketService.emit('changeTables', {});
        // this._diningSocketService.emit('loadOrders', {});
        this.closeModal();
        this.cartItems.splice(0, this.cartItems.length);
        this.cheakCartIsEmpty();
      },
      (err) => this.notifications.normalErrorNotify(err.error.message)
    );
  }
}
