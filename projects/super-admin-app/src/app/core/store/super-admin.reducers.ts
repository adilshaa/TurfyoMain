import { createReducer, on } from '@ngrx/store';
import {
  restaurantModel,
  FullRestaurantDetails,
} from '../models/restaurant.model';
import {
  getRestaurantData,
  reciveGetData,
  recivedRestaurantData,
  retriveResFullDetails,
} from './super-admin.actions';
import { act } from '@ngrx/effects';
import { resFullData } from './super-admin.states';

//get All restaruants
export const initialStateOfAllRestauarnt: restaurantModel[] = [];

const _restaurantsDataReducer = createReducer(
  initialStateOfAllRestauarnt,
  on(recivedRestaurantData, (state, { restaurantData }) => {
    console.log(restaurantData);

    return [...restaurantData];
  })
);
export function restaurantsDataReducer(state: any, action: any) {
  return _restaurantsDataReducer(state, action);
}

// Get one restaurants full details

export const initialStateofOneRestaurant: FullRestaurantDetails = {
  _id: '',
  name: '',
  place: '',
  owner_name: '',
  owner_email: '',
  password: '',
  owner_number: '',
  poc_doc: '',
  registration_data: '',
  registration_id: '',
  restaurant_no: '',
  license: '',
  status,
};

export const _resFullDetails = createReducer(
  initialStateofOneRestaurant,
  on(reciveGetData, (state, { allRestaurantData }: any) => {
    console.log(allRestaurantData);
    return allRestaurantData;
  })
);

export const resFullDetails = (state: any, action: any) => {
  return _resFullDetails(state, action);
};
