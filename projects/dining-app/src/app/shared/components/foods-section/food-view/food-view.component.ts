import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
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
  foodsData$ = this.diningStore.pipe(select(foodsDatas));
  searchFoods: string = '';
  socket = io('http://localhost:5000');
  foodData: any;
  constructor(
    private router: Router,
    private diningService: DiningServicesService,
    private diningStore: Store<{ foodsData: foodsStructure[] }>
  ) {}
  ngOnInit(): void {
        this.socket.emit('listFoods');

    // console.log("this.socket");
  
const showFoods$ = fromEvent(this.socket, 'showFoods');

const subscription = showFoods$.subscribe(
  (data) => {
    console.log(data);
    this.foodData = data;
    console.log(this.foodData);
  },
  (error) => {
    console.error('An error occurred:', error);
  }
);
    this.diningStore.dispatch(getAllFoods());
  }
}
