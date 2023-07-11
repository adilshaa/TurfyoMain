import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DiningServicesService } from '../services/dining-services.service';
import { map, switchMap } from 'rxjs';
import { getAllFoods, reciveAllFoods } from './dining.actions';
import { foodsStructure } from "../models/foods";

@Injectable()
export class FoodsData {
  constructor(
    private diningService: DiningServicesService,
    private action$: Actions
  ) {}

  projectFoods$ = createEffect(() =>
    this.action$.pipe(
      ofType(getAllFoods),
        switchMap(() => {
            return this.diningService
              .fetchFoods()
              .pipe(map((data) => reciveAllFoods({ foodsData : data as foodsStructure[]
            })));
      })
    )
  );
}
