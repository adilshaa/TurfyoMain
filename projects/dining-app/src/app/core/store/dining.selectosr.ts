import { createSelector } from "@ngrx/store";
import { FoodsState } from "./dining.state";
import { foodsStructure } from "../models/foods";

export const foodRootSelector = (state: FoodsState) =>
    state.foodsData

export const foodsDatas = createSelector(
  foodRootSelector,
    (foodsDatas: foodsStructure[]) => {
      console.log(foodsDatas);
      
    return [...foodsDatas];
  }
);