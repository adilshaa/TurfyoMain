import { createAction, props } from '@ngrx/store';
import { Foodsstructure } from '../models/foods';

export const fetchFoodsData = createAction('[API Fetch foods]API FOOD');

export const reciveFoods = createAction(
  '[API recive Fetched foods]API FOOD',
  props<{ foodsData: Foodsstructure[] }>()
);
