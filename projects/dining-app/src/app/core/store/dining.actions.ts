import { createAction, props } from "@ngrx/store";
import {foodsStructure} from  '../models/foods'
export const getAllFoods = createAction('[API Get all foods]API FOODS')

export const reciveAllFoods = createAction(
  '[API Recive All Foods Sucess]API FOOD',
  props<{ foodsData:foodsStructure[]}>()
);