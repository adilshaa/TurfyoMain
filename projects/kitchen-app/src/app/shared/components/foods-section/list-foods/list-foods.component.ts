import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Foodsstructure } from 'projects/kitchen-app/src/app/core/models/foods';
import { KitchenServiceService } from 'projects/kitchen-app/src/app/core/services/kitchen-service.service';
import { SocketKitchenServiceService } from 'projects/kitchen-app/src/app/core/services/socket-kitchen-service.service';
import { fetchFoodsData } from 'projects/kitchen-app/src/app/core/store/kitchen.actions';
import { FoodsDatas } from 'projects/kitchen-app/src/app/core/store/kitchen.selector';
import { io } from 'socket.io-client';
@Component({
  selector: 'app-list-foods',
  templateUrl: './list-foods.component.html',
  styleUrls: ['./list-foods.component.css'],
})
export class ListFoodsComponent implements OnInit {
  foodsData$!: any[];
  foodData!: any;
  socket = io('http://localhost:5000');
  categories: any;
  constructor(
    private http: HttpClient,
    private kitchenService: KitchenServiceService,
    private _kitchenSocketService: SocketKitchenServiceService
  ) {}
  ngOnInit(): void {
    this.loadFood();
    this.lsitCategories();
  }
  updateStock(id: any, key: number) {
    this.kitchenService.updateStock(id, key).subscribe(
      (res) => {
        this._kitchenSocketService.emit('listFoodsToKitchen', {});
        this._kitchenSocketService.emit('listFoodsandChange', { id: id });

        // this._kitchenSocketService.emit('listFoods', {});
      },
      (err) => console.log(err)
    );
  }
  loadFood() {
    this._kitchenSocketService.emit('listFoodsToKitchen', {});
    this._kitchenSocketService.listen('showFoodsinKithen').subscribe(
      (res) => {
        this.foodsData$ = res.foodData;
      },
      (err) => console.log(err.error)
    );
  }
  lsitCategories() {
    this.kitchenService.listCategory().subscribe((res) => {
      console.log(res);
      this.categories = res;
    });
  }
  filterFood(id: string) {
    console.log(id);
    this._kitchenSocketService.emit('filterFoodsToKitchen', id);

    this._kitchenSocketService.listen('FilteredFoods').subscribe((res) => {
      this.foodsData$ = res;
    });
  }
}
