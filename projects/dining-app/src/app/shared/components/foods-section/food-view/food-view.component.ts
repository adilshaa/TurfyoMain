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
  searchFoods: string = '';
  socket = io('http://localhost:5000');
  foodData: any;
  empty!: boolean;

  constructor(
    private router: Router,
    private diningService: DiningServicesService,
    private diningStore: Store<{ foodsData: foodsStructure[] }>
  ) {}
  ngOnInit(): void {
    this.socket.emit('listFoods');
    const showFoods$ = fromEvent(this.socket, 'showFoods');
    const subscription = showFoods$.subscribe(
      (data) => {
        this.foodData = data;
        if (this.foodData[0] == null) {
          this.empty = true;
        } else {
          this.empty = false;
        }
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }
}
