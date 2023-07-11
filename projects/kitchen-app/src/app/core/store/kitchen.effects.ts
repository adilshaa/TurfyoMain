






import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap } from 'rxjs';

import { fetchFoodsData, reciveFoods } from './kitchen.actions';
import { KitchenServiceService } from '../services/kitchen-service.service';
import { Foodsstructure } from '../models/foods';

@Injectable()
export class Foodseffect {
  constructor(
    private actions$: Actions,
    private resService: KitchenServiceService
  ) {}

  projectAllFoods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchFoodsData),
      switchMap(() => {
        return this.resService

          .fetchFoodsData()
          .pipe(
            map((data) => reciveFoods({ foodsData: data as Foodsstructure[] }))
          );
      })
    )
  );
}
