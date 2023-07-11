import { createSelector } from "@ngrx/store";
import { FoodsState } from "./kitchen.state";
import { Foodsstructure } from "../models/foods";

export const FoodsRootSelector = (state: FoodsState) => state.foodsData;

export const FoodsDatas = createSelector(
  FoodsRootSelector,
  (foodsDatas: Foodsstructure[]) => {
    console.log(foodsDatas);

    return [...foodsDatas];
  }
);
