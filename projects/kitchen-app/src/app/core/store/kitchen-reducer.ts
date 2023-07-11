import { createReducer, on } from '@ngrx/store';
import { Foodsstructure } from '../models/foods';
import { reciveFoods } from './kitchen.actions';

export const initialStateFoods: Foodsstructure[] = [];

export const _foodsDetails = createReducer(
  initialStateFoods,
  on(reciveFoods, (state, { foodsData }) => {
    return [...foodsData];
  })
);

export const foodDetails = (state: any, action: any) => {
  return _foodsDetails(state, action);
};
