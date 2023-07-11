import {
  restaurantModel,
  FullRestaurantDetails,
} from '../models/restaurant.model';
import { Injectable } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs';
import {
  getRestaurantData,
  recivedRestaurantData,
  retriveResFullDetails,
  reciveGetData,
} from './super-admin.actions';

@Injectable()
export class superAdminEffects {
  constructor(private actions$: Actions, private service: ServiceService) {}

  projectAllRestaurant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRestaurantData),
      switchMap(() => {
        return this.service.getAllRestaurantsData().pipe(
          map((data) =>
            recivedRestaurantData({
              restaurantData: data as restaurantModel[],
            })
          )
        );
      })
    )
  );

  projectFullDetailsOfRes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retriveResFullDetails),
      switchMap((id) => {
        console.log(id.id);
        return this.service.fullDetails(id.id).pipe(
          map((data) =>
            reciveGetData({
              allRestaurantData: data as FullRestaurantDetails,
            })
          )
        );
      })
    )
  );
}
