import * as restaurantModel from '../models/restaurant.model';

export interface allrestaurants {
  restaurantData: restaurantModel.restaurantModel[];
}

export interface resFullData {
  allRestaurantData: restaurantModel.FullRestaurantDetails;
}
