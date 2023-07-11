import { createReducer, on } from "@ngrx/store";
import { foodsStructure } from "../models/foods";
import { getAllFoods, reciveAllFoods } from "./dining.actions";

export const initialFoodsState: foodsStructure[] = []

export const _foodDataReducer = createReducer(
  initialFoodsState,
    on(reciveAllFoods, (state, { foodsData }) => {
      console.log(foodsData);
      
    return [...foodsData];
  })
);

export const fooodDataReducer = (state: any, action: any) => {
    return _foodDataReducer(state,action)
}