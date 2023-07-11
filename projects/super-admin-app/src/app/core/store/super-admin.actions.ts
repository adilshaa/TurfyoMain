import { createAction, props } from '@ngrx/store';
import {
  FullRestaurantDetails,
  restaurantModel,
} from '../models/restaurant.model';

// Get all restarurants Data
export const getRestaurantData = createAction(
  '[restaurants DATA API ] API GET'
);

// Get all restarurants Data response

export const recivedRestaurantData = createAction(
  '[ restaurant DATA RECIVER API] API DATA RECIVER',
  props<{ restaurantData: restaurantModel[] }>()
);

// Get one restaurants full details

export const retriveResFullDetails = createAction(
  '[ full details of restaurant  API] API GET FULL DATA',
  props<{ id: String }>()
);
export const reciveGetData = createAction(
  '[ recive restaurant full DEtails API] RECIVE ALL RESTAURNAT DATA API',
  props<{ allRestaurantData: FullRestaurantDetails }>()
);
