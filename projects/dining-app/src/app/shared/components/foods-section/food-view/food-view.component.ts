import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { foodsStructure } from 'projects/dining-app/src/app/core/models/foods';
import { DiningServicesService } from 'projects/dining-app/src/app/core/services/dining-services.service';
import { getAllFoods } from 'projects/dining-app/src/app/core/store/dining.actions';
import { foodsDatas } from 'projects/dining-app/src/app/core/store/dining.selectosr';

@Component({
  selector: 'app-food-view',
  templateUrl: './food-view.component.html',
  styleUrls: ['./food-view.component.css'],
})
export class FoodViewComponent implements OnInit {
  foodsData$ = this.diningStore.pipe(select(foodsDatas));

  constructor(
    private router: Router,
    private diningService: DiningServicesService,
    private diningStore: Store<{ foodsData: foodsStructure[] }>
  ) {}
  ngOnInit(): void {

    this.diningStore.dispatch(getAllFoods());
    
  }
}