import { createReducer, createSelector } from '@ngrx/store';
import { allrestaurants, resFullData } from './super-admin.states';
import {
  restaurantModel,
  FullRestaurantDetails,
} from '../models/restaurant.model';

export const restaurantDataRootSelector = (state: allrestaurants) =>
  state.restaurantData;

export const retaurantDatas = createSelector(
  restaurantDataRootSelector,
  (restaurantData: restaurantModel[]) => {
    console.log(restaurantData);

    return [...restaurantData];
  }
);

export const resFulldetails = (state: resFullData) => state.allRestaurantData;
export const restaurantsFullDetails = createSelector(
  resFulldetails,
  (allRestaurantData: FullRestaurantDetails) => {
    console.log(allRestaurantData);
    return allRestaurantData;
  }
);
