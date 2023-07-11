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
  socket = io('http://localhost:5000');

  constructor(
    private http: HttpClient,
    private kitchenStore: Store<{ foodsData: Foodsstructure[] }>,
    private kitchenService: KitchenServiceService
  ) {}
  ngOnInit(): void {
    this.socket.on('hello', (data) => {
      console.log(data);
      this.kitchenStore.dispatch(fetchFoodsData());
    });

    this.kitchenStore.dispatch(fetchFoodsData());
  }
  listFood(id: any, status: boolean) {
    this.kitchenService.listFoods(id, status).subscribe(
      (result) => {
        this.kitchenStore.dispatch(fetchFoodsData());

        console.log(result);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
