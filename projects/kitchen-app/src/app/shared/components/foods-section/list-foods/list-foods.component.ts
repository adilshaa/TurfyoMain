import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Foodsstructure } from 'projects/kitchen-app/src/app/core/models/foods';
import { KitchenServiceService } from 'projects/kitchen-app/src/app/core/services/kitchen-service.service';
import { fetchFoodsData } from 'projects/kitchen-app/src/app/core/store/kitchen.actions';
import { FoodsDatas } from 'projects/kitchen-app/src/app/core/store/kitchen.selector';
import { io } from 'socket.io-client';
@Component({
  selector: 'app-list-foods',
  templateUrl: './list-foods.component.html',
  styleUrls: ['./list-foods.component.css'],
})
export class ListFoodsComponent implements OnInit {
  foodsData$ = this.kitchenStore.pipe(select(FoodsDatas));
  foodData!: any;
  socket = io('http://localhost:5000');

  constructor(
    private http: HttpClient,
    private kitchenStore: Store<{ foodsData: Foodsstructure[] }>,
    private kitchenService: KitchenServiceService
  ) {}
  ngOnInit(): void {
    this.kitchenStore.dispatch(fetchFoodsData());
  }

  updateStock(id: any, key: number) {
    this.kitchenService.updateStock(id, key).subscribe(
      (res) => {
        let resId = localStorage.getItem('resId');
        this.socket.emit('listFoods', resId);
        this.socket.emit('notification');
        this.kitchenStore.dispatch(fetchFoodsData());
      },
      (err) => console.log(err)
    );

    console.log(id, key);
  }
}
